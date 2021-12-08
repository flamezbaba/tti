<template>
  <TopHeader />
  <SideBar />

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <div class="container-full">
      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-12 col-12">
            <div class="row">
              <div class="col-md-6 col-12">
                <div class="box">
                  <div class="box-header with-border">
                    <h4 class="box-title">Login</h4>
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
                            <label>Password</label>
                            <input
                              type="password"
                              class="form-control"
                              v-model="password"
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <router-link :to="{ name: 'Register' }"
                              >Register Here</router-link
                            >
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <button
                              class="btn btn-primary"
                              @click.prevent="loginUser"
                              v-show="!clipLoading"
                            >
                              Sign In
                            </button>

                            <button
                              class="btn btn-primary"
                              v-show="clipLoading"
                              disabled
                            >
                              <clip-loader
                                :loading="clipLoading"
                                :color="clipColor"
                                :size="clipSize"
                              ></clip-loader>
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
import { mapActions, mapMutations } from "vuex";

import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import SideBar from "@/components/SideBar.vue";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import FormError from "@/components/FormError.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  components: {
    SideBar,
    TopHeader,
    Footer,
    ClipLoader,
    FormError,
  },
  data() {
    return {
      email: null,
      password: null,
      clipLoading: false,
      clipColor: "#fff",
      clipSize: "16px",
      formError: false,
      formErrorMsg: null,
      formErrorClass: "alert-danger",
    };
  },
  created(){
    this.logOut();
    // this.GET_CURRENT_USERID();
    // console.log("store top "+this.$store.state.userId);
    // console.log("firebase top "+firebase.auth().currentUser.uid);
    
  },
  methods: {
      ...mapMutations(["UPDATE_USER_ID"]),
      ...mapActions(["GET_CURRENT_USERID"]),
    async logOut() {
      try {
        await firebase.auth().signOut();
        console.log("logout done");
        // signed out
      } catch (e) {
        // an error
        console.log("cant logout");
      }
    },
    async loginUser() {
      // console.log(this.email);
      // return;
      this.formError = false;

      if (this.email == null || this.email == "") {
        this.formError = true;
        this.formErrorMsg = "Email is empty";
        return;
      }

      if (this.password == null || this.password == "") {
        this.formError = true;
        this.formErrorMsg = "Password is empty";
        return;
      }

      this.clipLoading = true;
      let loader = this.$loading.show();
      
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

          this.GET_CURRENT_USERID();

        this.formError = true;
        this.formErrorClass = "alert-info";
        this.formErrorMsg = "Login Successful";

        this.$router.push({name: 'Dashboard'});
      } catch (error) {
        this.formError = true;
        this.formErrorClass = "alert-danger";
        this.formErrorMsg = "Login failed";
        console.log(error.message);
      }

      this.clipLoading = false;
      loader.hide();
    },
  },
};
</script>
    