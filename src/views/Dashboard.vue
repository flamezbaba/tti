<template>
  <UserTopHeader @token-loaded="loadToken" />
  <UserSideBar />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-8 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">
                        Welcome {{ username }}
                        </h5>
                      <h1 class="fw-700 text-dark mt-20">
                        {{ Number(totalInvestment).toLocaleString() }}
                        {{ tokenSymbol }}
                      </h1>
                      <p>Available Balance</p>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Invest in Lovecoins</h5>
                      <p class="mb-5">Get 30% in 5 Days</p>
                      <router-link
                        :to="{ name: 'Deposit' }"
                        class="btn btn-danger mt-30 d-block mb-md-0 mb-30"
                        >Deposit Now
                      </router-link>
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
                      <h5 class="text-uppercase fw-600">Affiliate Program</h5>
                      <div class="form-group">
                        <div class="input-group" @click="alert('ddd')">
                          <div class="input-group-addon">
                            <i class="fa fa-copy"></i>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            value="{{ $site_url }}"
                            readonly
                          />
                        </div>
                        <!-- /.input group -->
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
          <div class="col-md-4 col-12">
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Affiliate Balance</h5>
                      <h3 class="fw-700 text-dark mt-10">
                        {{ Number(availBonus).toLocaleString() }} {{ tokenSymbol }}
                      </h3>

                      <p class="mb-0">
                        <router-link
                        :to="{ name: 'Bonus' }"
                        class="btn btn-danger mt-30 d-block mb-md-0 mb-30"
                        >Withdraw Bonus
                      </router-link>
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
// import myUtils from "@/utils/my.js";

// import Web3 from "web3";
// var web3 = new Web3(window.ethereum);

import UserSideBar from "@/components/UserSideBar.vue";
import UserTopHeader from "@/components/UserTopHeader.vue";
import Footer from "@/components/Footer.vue";
// import FormError from "@/components/FormError.vue";

// import firebase from "firebase/app";
// import "firebase/auth";
import db from "../firebase/firebaseinit";

export default {
  name: "Dashboard",
  components: {
    UserSideBar,
    UserTopHeader,
    Footer,
  },
  data() {
    return {
      // username: firebaseAuth().currentUser.
      totalInvestment: 0,
      availBonus: 0,
    };
  },
  mounted() {
    this.getFirst();
  },
  created() {},
  methods: {
    ...mapActions(["CONNECT_WALLET"]),
    async loadToken(event) {
      this.tokenSymbol = event.tokenSymbol;
      this.tokenBalance = event.tokenBalance;
    },
    async getFirst() {
      let loader = this.$loading.show();

      try {

        var userRef = db.collection("users").doc(this.$store.state.userId);
        const userSnapshot = await userRef.get();
        this.username = userSnapshot.data().username;

        var dbref = db.collection("investments");
        var snapshot = await dbref
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.totalInvestment = 0;
        snapshot.forEach((doc) => {
          if (!doc.data().is_withdraw) {
            this.totalInvestment =
              this.totalInvestment + parseFloat(doc.data().returns);
          }
        });

        var dbref2 = db.collection("bonus");
        var snapshot2 = await dbref2
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.availBonus = 0;
        snapshot2.forEach((doc) => {
          if (!doc.data().is_withdraw) {
            this.availBonus =
              this.availBonus + parseFloat(doc.data().amount);
          }
        });
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: "Page Failed To Load",
        });
      }
      loader.hide();
    },
  },
};
</script>
      