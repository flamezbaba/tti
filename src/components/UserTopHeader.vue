<template>
  <!-- <div id="loader"></div> -->

  <header class="main-header">
    <div class="d-flex align-items-center logo-box justify-content-start">
      <!-- Logo -->
      <a href="#" class="logo">
        <!-- logo-->
        <div class="logo-mini w-30">
          <span class="light-logo"
            ><img src="images/logo-letter.png" alt="logo"
          /></span>
          <span class="dark-logo"
            ><img src="images/logo-letter.png" alt="logo"
          /></span>
        </div>
        <div class="logo-lg">
          <span class="light-logo"
            ><img src="images/logo-dark-text.png" alt="logo"
          /></span>
          <span class="dark-logo"
            ><img src="images/logo-light-text.png" alt="logo"
          /></span>
        </div>
      </a>
    </div>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <div class="app-menu">
        <ul class="header-megamenu nav">
          <li class="btn-group nav-item">
            <a
              href="#"
              class="
                waves-effect waves-light
                nav-link
                push-btn
                btn-primary-light
              "
              data-toggle="push-menu"
              role="button"
            >
              <i class="fa fa-bars"></i>
            </a>
          </li>
        </ul>
      </div>

      <div class="navbar-custom-menu r-side">
        <ul class="nav navbar-nav">
          <!-- Control Sidebar Toggle Button -->
          <!-- <li>
            <a
              href="#"
              title="Setting"
              class="btn-primary-light"
              style="width: auto; font-size: 14px"
            >
              Connect Wallet
            </a>
          </li> -->

          <!-- Control Sidebar Toggle Button -->
          <div v-if="this.$store.state.walletAddress">
            <li>
              <button
                href="#"
                title="Connected"
                class="btn btn-danger btn-sm"
                v-if="tkLoading"
              >
                <i class="fa fa-spinner fa-spin"></i>
                <span style="margin-left: 10px">Loading...</span>
              </button>
              <button
                href="#"
                title="Connected"
                class="btn btn-danger btn-sm"
                data-toggle="control-sidebar"
                v-else
              >
                <i class="mdi mdi-wallet"></i>
                <span style="margin-left: 10px">Connected</span>
              </button>
            </li>
          </div>
          <div v-else>
            <li>
              <button
                href="#"
                title="Connect"
                class="btn btn-primary btn-sm"
                @click.prevent="connectWallet()"
              >
                <i class="mdi mdi-wallet"></i>
                <span style="margin-left: 10px">Connect</span>
              </button>
            </li>
          </div>

          <!-- Control Sidebar -->
          <aside
            class="control-sidebar"
            v-show="this.$store.state.walletAddress"
          >
            <div class="rpanel-title" data-toggle="control-sidebar">
              <span class="pull-right btn btn-circle btn-danger"
                ><i class="ion ion-close text-white"></i
              ></span>
            </div>
            <!-- Create the tabs -->
            <ul class="nav nav-tabs control-sidebar-tabs">
              <li class="nav-item">
                <a
                  href="#control-sidebar-home-tab"
                  data-bs-toggle="tab"
                  class="active"
                >
                  Connected
                </a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <!-- Home tab content -->
              <div class="tab-pane active" id="control-sidebar-home-tab">
                <div class="flexbox">
                  <p>
                    {{ this.$store.state.currentWalletProvider }} -
                    {{ this.$store.state.networkName }} Network
                  </p>
                </div>
                <p style="word-wrap: break-word">
                  <b>Address: </b> {{ this.$store.state.walletAddress }}
                </p>
                <p style="word-wrap: break-word">
                  <b>BNB Balance:</b>
                  {{ parseFloat(this.$store.state.walletBalance).toFixed(6) }}
                  {{ currency }} ({{
                    Number(parseFloat(usdBal).toFixed(2)).toLocaleString()
                  }}
                  USD)
                </p>
                <p style="word-wrap: break-word">
                  <b>Token In Wallet:</b>
                  {{ Number(tokenBalance).toLocaleString() }} {{ tokenSymbol }}
                </p>
                <button
                  href="#"
                  title="Connect"
                  class="btn btn-danger btn-xs"
                  @click.prevent="disconnectWallet()"
                >
                  <i class="fa fa-close"></i>
                  <span style="margin-left: 10px">DisConnect Wallet</span>
                </button>
              </div>
              <!-- /.tab-pane -->
            </div>
          </aside>
          <!-- /.control-sidebar -->

          <!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
          <div
            class="control-sidebar-bg"
            v-show="this.$store.state.walletAddress"
          ></div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from "vuex";
// import axios from "axios";
import myUtils from "@/utils/my.js";
import Web3 from "web3";
// var web3 = new Web3(Web3.givenProvider || "ws://localhost:9545");
var web3 = new Web3(window.ethereum);

export default {
  name: "UserTopHeader",
  data() {
    return {
      tokenSymbol: null,
      tokenBalance: 0,
      usdBal: 0,
      tkLoading: false,
    };
  },
  mounted() {
    this.GET_CURRENT_WALLET();
    
  },
  created() {
    this.loadUserToken();
  },
  computed: {
    currency: function () {
      return myUtils.currency(this.$store.state.networkId);
    },
  },
  methods: {
    ...mapActions([
      "CONNECT_WALLET",
      "DISCONNECT_WALLET",
      "GET_CURRENT_WALLET",
    ]),
    async loadUserToken() {
      
      if (this.$store.state.walletAddress){
        this.tkLoading = true;
        try {
          let contractInterface = new web3.eth.Contract(
            myUtils.contract_abi(),
            myUtils.contract_addr()
          );

          var bal = await contractInterface.methods
            .balanceOf(this.$store.state.walletAddress)
            .call();

          // console.log(bal);

          this.tokenBalance = web3.utils.fromWei(bal, "ether");

          this.tokenSymbol = await contractInterface.methods.symbol().call();

          this.usdBal = await myUtils.convertBnbUsd(
            this.$store.state.walletBalance
          );

          var tdata = {
            tokenBalance: this.tokenBalance,
            tokenSymbol: this.tokenSymbol,
          }

          this.$emit("token-loaded", tdata);
        } catch (error) {
          console.log(error);
        }
        this.tkLoading = false;
      }
      else {
        this.$swal({
          icon: "error",
          text: "You must connect a wallet",
        });
      }
    },
    async connectWallet() {
      let loader = this.$loading.show();
      try {
        await this.CONNECT_WALLET();
        this.loadUserToken();
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: err,
        });
      }

      loader.hide();
    },
    async disconnectWallet() {
      let loader = this.$loading.show();
      try {
        await this.DISCONNECT_WALLET();
        this.loadUserToken();
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: err,
        });
      }
      loader.hide();
    },
  },
};
</script>
  