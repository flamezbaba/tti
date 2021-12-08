<template>
    <aside class="main-sidebar">
      <!-- sidebar-->
      <section class="sidebar position-relative">
        <div class="multinav">
          <div class="multinav-scroll" style="height: 100%">
            <!-- sidebar menu-->
            <ul class="sidebar-menu" data-widget="tree">

              <li>
                <router-link :to="{ name: 'Dashboard'}">
                  <i class="fa fa-home"></i>
                  <span>Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Deposit'}">
                  <i class="fa fa-usd"></i>
                  <span>Make Deposit</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Investments'}">
                  <i class="fa fa-pie-chart"></i>
                  <span>Investments</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Bonus'}">
                  <i class="fa fa-suitcase"></i>
                  <span>My Bonus</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'Profile'}">
                  <i class="fa fa-user"></i>
                  <span>My Profile</span>
                </router-link>
              </li>
              <li @click="logOut">
                <a href="#">
                  <i class="fa fa-sign-out"></i>
                  <span>Log Out</span>
                </a>
              </li>

            </ul>

            
          </div>
        </div>
      </section>
    </aside>
</template>

<script>
  import firebase from "firebase/app";
import "firebase/auth";
import { mapActions } from "vuex";
export default {
  name: "UserSideBar",
  methods: {
    ...mapActions(["LOGOUT"]),
    async logOut() {
      try {
        await this.LOGOUT();
        await firebase.auth().signOut();

        this.$router.push({name: 'Login'});
      } catch (e) {
        // an error
        console.log("cant logout");
      }
    },
  },
};
</script>
  