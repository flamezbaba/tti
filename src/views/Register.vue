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
                    <h4 class="box-title">Register</h4>
                  </div>
                  <div class="box-body">
                    <form method="POST" action="#">
                      <div class="row">
                        <FormError
                          :msg="formErrorMsg"
                          :classType="formErrorClass"
                          v-show="formError"
                        />

                        <div class="col-md-12" v-show="refMessage">
                          <div class="form-group">
                            <button class="btn btn-success" @click.prevent="">
                              {{ refMessage }}
                            </button>
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="username"
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
                            <label>Password</label>
                            <input
                              type="password"
                              class="form-control"
                              v-model="password"
                            />
                            <p>at least 6 characters</p>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <router-link :to="{ name: 'Login' }"
                              >Login Here</router-link
                            >
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <button
                              class="btn btn-primary"
                              @click.prevent="registerUser"
                              v-show="!clipLoading"
                            >
                              Register
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
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import SideBar from "@/components/SideBar.vue";
import TopHeader from "@/components/TopHeader.vue";
import Footer from "@/components/Footer.vue";
import FormError from "@/components/FormError.vue";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseinit";
import { mapActions } from "vuex";

export default {
  name: "Register",
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
      username: null,
      password: null,
      refUsername: null,
      refMessage: null,
      refUID: null,
      clipLoading: false,
      clipColor: "#fff",
      clipSize: "14px",
      formError: false,
      formErrorMsg: null,
      formErrorClass: "alert-danger",
    };
  },
  mounted() {
    this.checkRef();
  },
  created() {
    
  },
  methods: {
    ...mapActions(["GET_CURRENT_USERID"]),
    async checkRef() {
      if (this.$route.params.username) {
        let loader = this.$loading.show();
        var u = this.$route.params.username.toString().toLowerCase();

        var dbref = db.collection("users");
        const snapshot = await dbref.where("username", "==", u).get();

        if (snapshot.size > 0) {
          this.refUsername = u;
          this.refMessage = `Your Referral is ${u}`;
          snapshot.forEach((doc) => {
            // console.log(doc.id);
            this.refUID = doc.id;
          });
        } else {
          this.refMessage = `Your Referral Does Not Exist`;
        }
        loader.hide();
      }
    },
    async registerUser() {
      // console.log(this.email);
      // return;
      this.formError = false;

      if (this.username == null || this.username == "") {
        this.formError = true;
        this.formErrorMsg = "Username is empty";
        return;
      }

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
      // check if username exist
      try {
        var dbref = db.collection("users");
        const snapshot = await dbref
          .where("username", "==", this.username)
          .get();

        if (snapshot.size > 0) {
          this.clipLoading = false;
          this.$swal({
            icon: "error",
            text: `Username ${this.username} already exist`,
          });
          return;
        }
      } catch (err) {
        this.clipLoading = false;
        this.$swal({
          icon: "error",
          text: `Failed`,
        });
        return;
      }

      try {
        const firebaseAuth = await firebase.auth();
        // const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password);
        const result = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const dataBase = await db.collection("users").doc(result.user.uid);
        dataBase.set({
          email: this.email,
          username: this.username,
          password: this.password,
          refUID: this.refUID,
        });

        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        this.GET_CURRENT_USERID();

        this.formError = true;
        this.formErrorClass = "alert-info";
        this.formErrorMsg = "Registration Successful";
        this.$router.push({name: 'Dashboard'});
      } catch (error) {
        console.log(error.message);
        this.formError = true;
        this.formErrorMsg = "Registration failed " + error.message;
      }
      this.clipLoading = false;
      // setTimeout(()=>{
      //   this.clipLoading = !this.clipLoading;
      // }, '500');
    },
  },
};
</script>
  