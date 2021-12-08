
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
                  <div class="col-md-10 col-12">
                    <div class="p-10">
                      <h5 class="text-uppercase fw-600">Available Bonus</h5>
                      <h1 class="fw-700 text-dark mt-20">
                        {{ Number(availBonus).toLocaleString() }}
                        {{ tokenSymbol }}
                      </h1>
                      <div
                        class="
                          d-md-flex d-block
                          justify-content-between
                          align-items-center
                        "
                      ></div>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <a
                      href="#"
                      class="btn btn-danger mt-30 d-block mb-md-0 mb-30"
                      >Withdraw</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="box">
              <div class="box-header with-border">
                <h5 class="box-title">Bonus history</h5>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="table-responsive">
                  <table
                    id="example1"
                    class="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>S/N</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>From</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr :key="n" v-for="(r, n) in recordList">
                        <td>{{ n + 1 }}</td>
                        <td>{{ format_date(r.created_at.toDate()) }}</td>
                        <td>
                          {{ Number(r.amount).toLocaleString() }}
                          {{ r.currency }}
                        </td>
                        <td>{{ r.from_username }}</td>
                        <td>
                          <span
                            class="badge badge-pill badge-success"
                            v-if="r.is_withdraw"
                            >Paid</span
                          >
                          <span class="badge badge-pill badge-danger" v-else
                            >Pending</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import moment from "moment";

import UserSideBar from "@/components/UserSideBar.vue";
import UserTopHeader from "@/components/UserTopHeader.vue";
import Footer from "@/components/Footer.vue";

import db from "../firebase/firebaseinit";

export default {
  name: "Bonus",
  components: {
    UserSideBar,
    UserTopHeader,
    Footer,
    // FormError,
    // TradingView
  },
  data() {
    return {
      recordList: [],
      availBonus: 0,
    };
  },
  created() {
    this.getRecords();
  },
  methods: {
    format_date(d) {
      var dx = moment(String(d)).format("dddd DD-MMM-YYYY");
      return dx;
    },
    async loadToken(event) {
      this.tokenSymbol = event.tokenSymbol;
      this.tokenBalance = event.tokenBalance;
    },
    async getRecords() {
      let loader = this.$loading.show();
      try {
        var dbref = db.collection("bonus");
        const snapshot = await dbref
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.availBonus = 0;
        snapshot.forEach((doc) => {
          this.recordList.push(doc.data());

          if (!doc.data().is_withdraw) {
            this.availBonus = this.availBonus + doc.data().amount;
          }
        });
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: "Error Loading Bonus",
        });
      }
      loader.hide();
    },
  },
};
</script>
            