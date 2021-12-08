
<template>
  <UserTopHeader />
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
                        <b>IMPORTANT NOTICE</b><br />
                        Your Profit will be automatically withdrawn to your
                        wallet address at time due.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            :key="n"
            v-for="(r, n) in investmentList"
            class="col-md-4 col-12"
          >
            <div class="box">
              <div class="box-body">
                <div class="row justify-content-between">
                  <div class="col-md-12 col-12">
                    <div class="p-10" style="word-wrap: break-word">
                      <h5 class="text-uppercase fw-600">
                        {{ format_date(r.created_at.toDate()) }}
                      </h5>
                      <p>
                        <b>Invested: </b>
                        {{ Number(r.amount).toLocaleString() }} {{ r.currency }}
                      </p>

                      <p>
                        <b>Profit: </b>
                        {{ Number(r.returns).toLocaleString() }}
                        {{ r.currency }}
                      </p>
                      <p>
                        <b>Wallet Address: </b>
                        <br />
                        {{ r.wallet_address }}
                      </p>
                      <div v-if="r.is_withdraw">
                        <button class="btn btn-success btn-sm">
                          Withdrawal Done
                        </button>
                      </div>
                      <div v-else>
                        <button class="btn btn-danger btn-sm">
                          <vue-countdown
                            :time="
                              (r.return_date.toDate().getDate() *
                              r.return_date.toDate().getHours() *
                              60 *
                              60 *
                              1000)
                            "
                            v-slot="{ days, hours, minutes, seconds }"
                          >
                            Time Remaining To Auto Withdrawal：<br />
                            {{ days }} days, {{ hours }} hours,
                            {{ minutes }} minutes, {{ seconds }} seconds.
                          </vue-countdown>
                        </button>
                      </div>
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
import moment from "moment";
// import myUtils from "@/utils/my.js";

// import Web3 from "web3";
// var web3 = new Web3(window.ethereum);

import UserSideBar from "@/components/UserSideBar.vue";
import UserTopHeader from "@/components/UserTopHeader.vue";
import Footer from "@/components/Footer.vue";

import db from "../firebase/firebaseinit";

export default {
  name: "Investments",
  components: {
    UserSideBar,
    UserTopHeader,
    Footer,
    // FormError,
    // TradingView
  },
  data() {
    return {
      investmentList: [],
    };
  },
  mounted() {
    this.getInvestments();
  },
  created() {},
  computed: {},
  methods: {
    ...mapActions(["CONNECT_WALLET"]),
    format_date(d) {
      var dx = moment(String(d)).format("dddd DD-MMM-YYYY");
      return dx;
    },
    async getInvestments() {
      let loader = this.$loading.show();
      try {
        var dbref = db.collection("investments");
        const snapshot = await dbref
          .where("uid", "==", this.$store.state.userId)
          .get();
        snapshot.forEach((doc) => {

          this.investmentList.push(doc.data());
        });
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: "Error Loading Investments",
        });
      }
      loader.hide();
    },
  },
};
</script>
          