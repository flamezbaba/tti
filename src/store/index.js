import { createStore } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import createPersistedState from "vuex-persistedstate";
import Web3 from "web3";
import myUtils from "@/utils/my.js";

export default createStore({
  state: {
    userId: null,
    username: null,
    walletAddress: null,
    walletBalance: null,
    networkId: null,
    networkName: null,
    currentWalletProvider: null,
    systemCurrency: null
  },
  getters: {},
  mutations: {
    UPDATE_USER_ID: (state, _id) => {
      state.userId = _id;
    },
    UPDATE_USERNAME: (state, payload) => {
      state.username = payload;
    },
    UPDATE_WALLET_ADDRESS: (state, payload) => {
      state.walletAddress = payload;
    },
    UPDATE_WALLET_BALANCE: (state, payload) => {
      state.walletBalance = payload;
    },
    UPDATE_NETWORK_ID: (state, payload) => {
      state.networkId = payload;
    },
    UPDATE_NETWORK_NAME: (state, payload) => {
      state.networkName = payload;
    },
    UPDATE_CURRENT_PROVIDER: (state, payload) => {
      state.currentWalletProvider = payload;
    },
    UPDATE_SYSTEM_CURRENCY: (state, payload) => {
      state.systemCurrency = payload;
    },
  },
  actions: {
    async GET_CURRENT_USERID({ commit }) {
      commit("UPDATE_USER_ID", firebase.auth().currentUser.uid);
    },
    async GET_CURRENT_WALLET({ commit }) {
      var web3js = window.web3;
      if (typeof web3js !== "undefined") {
        var web3 = new Web3(window.ethereum);
        try {  
          const { ethereum } = window;
          var a = await ethereum.enable();
          var addr = web3.utils.toChecksumAddress(a[0]);
          commit("UPDATE_WALLET_ADDRESS",addr);

          web3.eth.getBalance(addr).then((r) => {
            commit("UPDATE_WALLET_BALANCE",web3.utils.fromWei(r, "ether"));
          });

          commit("UPDATE_NETWORK_ID", await web3.eth.net.getId());
          commit("UPDATE_NETWORK_NAME", myUtils.network(await web3.eth.net.getId()));
          commit("UPDATE_CURRENT_PROVIDER", myUtils.getCurrentProvider());
          
        } catch (error) {
          commit("UPDATE_WALLET_ADDRESS", null);
          commit("UPDATE_WALLET_BALANCE", null);
          commit("UPDATE_NETWORK_ID", null);
          commit("UPDATE_NETWORK_NAME", null);
          commit("UPDATE_CURRENT_PROVIDER", null);
        }
      } else {
        commit("UPDATE_WALLET_ADDRESS", null);
        commit("UPDATE_WALLET_BALANCE", null);
        commit("UPDATE_NETWORK_ID", null);
        commit("UPDATE_NETWORK_NAME", null);
        commit("UPDATE_CURRENT_PROVIDER", null);
      }
    },
    async CONNECT_WALLET({ commit }) {
      var web3js = window.web3;
      if (typeof web3js !== "undefined") {
        var web3 = new Web3(window.ethereum);

        try {
          const { ethereum } = window;
          var a = await ethereum.enable();
          var addr = web3.utils.toChecksumAddress(a[0]);
          commit("UPDATE_WALLET_ADDRESS", addr);
          web3.eth.getBalance(addr).then((r) => {
            commit("UPDATE_WALLET_BALANCE",web3.utils.fromWei(r, "ether"));
          });
          commit("UPDATE_NETWORK_ID", await web3.eth.net.getId());
          commit("UPDATE_NETWORK_NAME", myUtils.network(await web3.eth.net.getId()));
          commit("UPDATE_CURRENT_PROVIDER", myUtils.getCurrentProvider());
          // commit("UPDATE_SYSTEM_CURRENCY", myUtils.currency(await web3.eth.net.getId()));
        } catch (error) {
          if (error.code === 4001) {
            throw "Please connect a wallet.";
          } else {
            throw error.message;
          }
        }
      } else {
        throw "Unable to connect a wallet";
      }
    },
    async DISCONNECT_WALLET({ commit }) {
      commit("UPDATE_WALLET_ADDRESS", null);
      commit("UPDATE_WALLET_BALANCE", null);
      commit("UPDATE_NETWORK_ID", null);
      commit("UPDATE_NETWORK_NAME", null);
      commit("UPDATE_CURRENT_PROVIDER", null);
    },
    async LOGOUT({ commit }) {
      commit("UPDATE_USER_ID", null);
      commit("UPDATE_WALLET_ADDRESS", null);
      commit("UPDATE_WALLET_BALANCE", null);
      commit("UPDATE_NETWORK_ID", null);
      commit("UPDATE_NETWORK_NAME", null);
      commit("UPDATE_CURRENT_PROVIDER", null);
    },
  },
  plugins: [createPersistedState()],
});
