
<template>
  <UserTopHeader @token-loaded="loadToken" />
  <UserSideBar />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-12 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <p class="mb-5">
                        Deposit can be done in two ways<br />
                        1. Via Direct Crypto Payment, Once payment is confirmed
                        the equaivalent token will be credited to your
                        account<br />
                        2. Get token from PancakeSwap and deposit via DAPPS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Deposit Via DAPPS</h5>
                      <form>
                        <div class="form-group">
                          <label>Amount in Tokens</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="amountDapp"
                          />
                          <p></p>
                        </div>
                        <div class="form-group">
                          <button
                            class="btn btn-danger btn-sm"
                            @click.prevent="depositDapp"
                          >
                            Deposit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">
                        Deposit Via Token Sale
                      </h5>
                      <form>
                        <div class="form-group">
                          <label>Amount in ETH</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="amountEth"
                            v-on:keyup="calcToken"
                          />
                          <p>{{ ethToTokenAmount }}</p>
                        </div>
                        <div class="form-group">
                          <button
                            class="btn btn-danger btn-sm"
                            @click.prevent="tokenSale"
                          >
                            Deposit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Direct Deposit</h5>
                      <form>
                        <div class="form-group">
                          <label>Amount in USD</label>
                          <input type="text" class="form-control" />
                          <p>You get 300,000 Tokens</p>
                        </div>
                        <div class="form-group">
                          <button class="btn btn-primary btn-sm">
                            Deposit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Currency Converter</h5>
                      <div class="col-12">
                        <div class="buy-input-block-content row">
                          <div class="buy-input-box col-md-5">
                            <div class="form-group">
                              <label>USD</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="899 USD"
                                name=""
                              />
                            </div>
                          </div>
                          <div class="col-md-2 text-center">
                            <i class="fa fa-exchange dir-icon"></i>
                          </div>
                          <div class="buy-input-box col-md-5">
                            <div class="form-group">
                              <label>Token</label>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="8 BTC"
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          class="
                            waves-effect waves-light
                            btn btn-success
                            my-10
                            d-block
                            w-p100
                          "
                        >
                          Buy Bitcoin
                        </button>
                      </div>
                      <p class="mb-5">
                        Send the Gift of Lovecoin to your family, friends and
                        followers. Get paid when they join. Earn 20,000 free
                        coins per referral.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /.content -->
    </div>
  </div>

  <Footer />
</template>
      
      <script>
import { mapActions } from "vuex";
import myUtils from "@/utils/my.js";

import Web3 from "web3";
var web3 = new Web3(window.ethereum);

import UserSideBar from "@/components/UserSideBar.vue";
import UserTopHeader from "@/components/UserTopHeader.vue";
import Footer from "@/components/Footer.vue";
// import FormError from "@/components/FormError.vue";

import db from "../firebase/firebaseinit";

export default {
  name: "Deposit",
  components: {
    UserSideBar,
    UserTopHeader,
    Footer,
    // FormError,
    // TradingView
  },
  data() {
    return {
      amountDapp: 0,
      tokenSymbol: null,
      tokenBalance: 0,
      usdBal: 0,
      ethToTokenAmount: "You will get 0 tokens",
      tokenSalesPrice: 0,
      amountEth: 0,
      clipLoading: false,
      clipColor: "#fff",
      clipSize: "16px",
      formError: false,
      formErrorMsg: null,
      formErrorClass: "alert-danger",
      // fullPage: false,
    };
  },
  mounted() {
    this.loadNeeded();
  },
  created() {
    // var provider = web3js.currentProvider;
    // var web3 = new web3js.myweb3(window.ethereum);
    // var web3 = new Web3(provider);
    // this.loadWeb3();
    // this.$swal({
    //   icon: "success",
    //   text: "Login Successfull",
    //   toast: true,
    //   allowOutsideClick: false,
    // });
    // const Toast = this.$swal.mixin({
    //   toast: true,
    //   position: "top-end",
    //   showConfirmButton: false,
    //   timer: 3000,
    //   timerProgressBar: true,
    //   didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", this.$swal.stopTimer);
    //     toast.addEventListener("mouseleave", this.$swal.resumeTimer);
    //   },
    // });
    // Toast.fire({
    //   icon: "success",
    //   title: "Signed in successfully",
    // });
  },
  methods: {
    ...mapActions(["CONNECT_WALLET"]),
    async loadToken(event) {
      this.tokenSymbol = event.tokenSymbol;
      this.tokenBalance = event.tokenBalance;
    },
    async loadNeeded() {
      let contractInterface = new web3.eth.Contract(
        myUtils.contract_abi(),
        myUtils.contract_addr()
      );

      // await contractInterface.methods
      //   .updateSalesPrice(web3.utils.toWei("1000000", "ether"))
      //   .send({ from: "0x0a7063266Fb47188E0EE149f72df15627bC7860b" });

      // await contractInterface.methods
      //   .startSales()
      //   .send({ from: "0x0a7063266Fb47188E0EE149f72df15627bC7860b" });

      let getSalesPrice = await contractInterface.methods
        .getSalesPrice()
        .call({ from: myUtils.contract_owner() });
      // .call({ from: "0x1E238E28075695298F3c0eAd9087e2317F6354bc" });
      // this.tokenSalesPrice =  getSalesPrice;
      this.tokenSalesPrice = web3.utils.fromWei(
        getSalesPrice.toString(),
        "ether"
      );
    },
    calcToken() {
      var givenToken = this.amountEth * this.tokenSalesPrice;
      this.ethToTokenAmount = `You will get ${Number(
        givenToken
      ).toLocaleString()} tokens`;
      // console.log(this.ethToTokenAmount);
    },
    async depositDapp() {
      // clean amount
      this.amountDapp = myUtils.cleanFloat(this.amountDapp);

      // check amount
      if (this.amountDapp < 10 || !this.amountDapp) {
        this.$swal({
          icon: "error",
          text: "Amount must be in tokens",
        });
        return;
      }

      // check user token balance
      if (this.tokenBalance < this.amountDapp) {
        this.$swal({
          icon: "error",
          text: `Insufficient Token Balance, get more ${this.tokenSymbol} token. See options above`,
        });

        return;
      }

      let loader = this.$loading.show();

      // check investment count
      var dbref = db.collection("investments");
      var snapshot = await dbref
        .where("uid", "==", this.$store.state.userId)
        .get();
      if (snapshot.size >= 2) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: `You already a have pending investment`,
        });

        return;
      }

      // run contract transfer method
      try {
        let contractInterface = new web3.eth.Contract(
          myUtils.contract_abi(),
          myUtils.contract_addr()
        );

        // console.log(this.$store.state.walletAddress);

        var etherAmount = web3.utils.toWei(this.amountDapp.toString());
        await contractInterface.methods
          .transfer(myUtils.contract_owner(), etherAmount)
          .send({ from: this.$store.state.walletAddress });

        // calculate investment
        const returnAmount =
          parseFloat(myUtils.investmentPercentage() / 100) * this.amountDapp +
          this.amountDapp;

        // save to DB
        const dataBase = await db.collection("investments").doc();
        dataBase
          .set({
            uid: this.$store.state.userId,
            amount: this.amountDapp,
            alt_amount: 0,
            currency: this.tokenSymbol,
            alt_currency: null,
            returns: parseFloat(returnAmount),
            alt_returns: 0,
            percentage: myUtils.investmentPercentage(),
            period: myUtils.investmentPeriod(),
            is_withdraw: false,
            is_confirm: true,
            created_at: new Date(),
            wallet_address: this.$store.state.walletAddress,
            return_date: myUtils.addDays(
              new Date(),
              myUtils.investmentPeriod()
            ),
            withdraw_date: null,
          })
          .then(() => {
            // dataBase.get().then((doc) => {
            //   console.log(doc.data()); // prints {id: "the unique id"}
            // });
          });
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Transaction Failed",
        });
        console.log(error);
        loader.hide();
        return;
      }

      loader.hide();

      this.$swal({
        icon: "success",
        text: `Deposit of ${this.amountDapp} ${this.tokenSymbol} token Successfull`,
      });

      this.amountDapp = 0;
    },
    async tokenSale() {
      // clean amount
      this.amountEth = myUtils.cleanFloat(this.amountEth);

      // check amount
      if (!this.amountEth) {
        this.$swal({
          icon: "error",
          text: "Amount must be in ETH",
        });
        return;
      }

      let loader = this.$loading.show();

      // check investment count
      var dbref = db.collection("investments");
      var snapshot = await dbref
        .where("uid", "==", this.$store.state.userId)
        .get();
      if (snapshot.size >= 2) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: `You already a have pending investment`,
        });

        return;
      }

      // run contract transfer method
      try {
        let contractInterface = new web3.eth.Contract(
          myUtils.contract_abi(),
          myUtils.contract_addr()
        );

        // get user details
        var userRef = db.collection("users").doc(this.$store.state.userId);
        const userSnapshot = await userRef.get();
        var userRealInfo = userSnapshot.data();

        // send token to user
        var etherAmount = web3.utils.toWei(this.amountEth.toString());
        await contractInterface.methods
          .tokenSale()
          .send({ from: this.$store.state.walletAddress, value: etherAmount });

        let getSalesPrice = await contractInterface.methods
          .getSalesPrice()
          .call({ from: myUtils.contract_owner() });

        let tokenSalesPrice = web3.utils.fromWei(
          getSalesPrice.toString(),
          "ether"
        );

        var givenToken = this.amountEth * tokenSalesPrice;

        // send token for deposit
        await contractInterface.methods
          .transfer(
            myUtils.contract_owner(),
            web3.utils.toWei(givenToken.toString())
          )
          .send({ from: this.$store.state.walletAddress });

        // calculate investment
        const returnAmount =
          parseFloat(myUtils.investmentPercentage() / 100) * givenToken +
          givenToken;

        // save to DB
        const dataBase = await db.collection("investments").doc();
        dataBase
          .set({
            uid: this.$store.state.userId,
            amount: givenToken,
            alt_amount: 0,
            currency: this.tokenSymbol,
            alt_currency: null,
            returns: parseFloat(returnAmount),
            alt_returns: 0,
            percentage: myUtils.investmentPercentage(),
            period: myUtils.investmentPeriod(),
            is_withdraw: false,
            is_confirm: true,
            created_at: new Date(),
            wallet_address: this.$store.state.walletAddress,
            return_date: myUtils.addDays(
              new Date(),
              myUtils.investmentPeriod()
            ),
            withdraw_date: null,
          })
          .then(() => {
            // dataBase.get().then((doc) => {
            //   console.log(doc.data()); // prints {id: "the unique id"}
            // });
          });

        // give bonus
        if (userRealInfo.refUID) {
          var bonus = parseFloat(
            (myUtils.bonusPercentage() / 100) * givenToken
          );
          console.log(bonus);
          const bonusDataBase = await db.collection("bonus").doc();
          bonusDataBase.set({
            uid: userRealInfo.refUID,
            amount: bonus,
            currency: this.tokenSymbol,
            type: "ref bonus",
            is_withdraw: false,
            from_username: userRealInfo.username,
            created_at: new Date(),
            withdraw_date: null,
          });
        }
      } catch (error) {
        this.$swal({
          icon: "error",
          text: "Transaction Failed",
        });
        console.log(error);
        loader.hide();
        return;
      }

      loader.hide();

      this.amountEth = 0;
      this.ethToTokenAmount = "You will get 0 tokens";
      this.$swal({
        icon: "success",
        text: `Deposit of ${givenToken} ${this.tokenSymbol} token Successfull`,
      });
    },
  },
};
</script>
        