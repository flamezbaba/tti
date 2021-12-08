
<template>
  <UserTopHeader />
  <UserSideBar />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-6 col-12">
            <div class="row">
              <div class="col-md-12 col-12">
                <div class="box">
                  <div class="box-header with-border">
                    <h4 class="box-title">My Information</h4>
                  </div>
                  <div class="box-body">
                    <form method="POST" action="#">
                      <div class="row">
                        <FormError
                          :msg="formErrorMsg"
                          :classType="formErrorClass"
                          v-show="formError"
                        />

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Username</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="username"
                              readonly
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="email"
                              
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Total Invested</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="totalInv"
                              readonly
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Total Withdrawn</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="totalWth"
                              readonly
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Total Bonus</label>
                            <input
                              type="email"
                              class="form-control"
                              v-model="totalBonus"
                              readonly
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <button
                              class="btn btn-primary"
                              @click.prevent="loginUser"
                            >
                              Change Email
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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
// import { mapActions } from "vuex";
// import myUtils from "@/utils/my.js";

// import Web3 from "web3";
// var web3 = new Web3(window.ethereum);

import UserSideBar from "@/components/UserSideBar.vue";
import UserTopHeader from "@/components/UserTopHeader.vue";
import Footer from "@/components/Footer.vue";

import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseinit";

export default {
  name: "Profile",
  components: {
    UserSideBar,
    UserTopHeader,
    Footer,
  },
  data() {
    return {
      recordList: [],
      email: firebase.auth().currentUser.email,
      username: "",
      totalInv: 0,
      totalWth: 0,
      totalBonus: 0,
    };
  },
  mounted() {
    this.getRecords();
  },
  created() {
    // console.log(firebase.auth().currentUser);
  },
  methods: {
    async getRecords() {
      let loader = this.$loading.show();
      try {
        var dbref = db.collection("users").doc(firebase.auth().currentUser.uid);
        const snapshot = await dbref.get();
        this.username = snapshot.data().username;

        var dbrefInv = db.collection("investments");
        var snapshotInv = await dbrefInv
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.totalInv = 0;
        snapshotInv.forEach((doc) => {
          if (doc.data().is_confirm) {
            this.totalInv = this.totalInv + parseFloat(doc.data().amount);
          }
        });

        var dbrefWth = db.collection("investments");
        var snapshotWth = await dbrefWth
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.totalWth = 0;
        snapshotWth.forEach((doc) => {
          if (doc.data().is_withdraw) {
            this.totalWth = this.totalWth + parseFloat(doc.data().returns);
          }
        });

        var dbref2 = db.collection("bonus");
        var snapshot2 = await dbref2
          .where("uid", "==", this.$store.state.userId)
          .get();
        this.totalBonus = 0;
        snapshot2.forEach((doc) => {
          if (!doc.data().is_withdraw) {
            this.totalBonus = this.totalBonus + parseFloat(doc.data().amount);
          }
        });
      } catch (err) {
        loader.hide();
        this.$swal({
          icon: "error",
          text: "Error Loading Profile",
        });
      }
      loader.hide();
    },
  },
};
</script>
            