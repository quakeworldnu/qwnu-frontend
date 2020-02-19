<template>
    <div id="app">
        <div class="container">
            <div class="col-md-12 pt-2 px-3 header-background">
                <div>
                    <router-link to="/">
                        <img src="./assets/qwnu-headerlogo.svg" class="logo">
                    </router-link>
                </div>
                <nav class="navbar navbar-expand-lg">
                    <!-- <a class="navbar-brand" href="#">Navbar</a> -->
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <!-- <span class="navbar-toggler-icon"></span> -->
                        <i class="fa fa-bars float-left m-1"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor01">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/">News</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/blog-posts">Blogs</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/forums">Forum</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/configs">Configs</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/maps">Maps</router-link>
                            </li>
                            <!-- <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >Game content</a>
                                <div
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <a class="dropdown-item" href="#">Configs</a>
                                    <a class="dropdown-item" href="#">Graphics</a>
                                </div>
                            </li> -->
                            <li class="nav-item">
                                <router-link class="nav-link" to="/about">About</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/users">Users</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/register">Register</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="https://wiki.quakeworld.nu">Wiki <i class="fas fa-external-link-alt"/></a>
                            </li>
                        </ul>
                        <!--
                        <form class="form-inline">
                        <input  class="form-control form-control-sm mr-sm-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        <button class="btn btn-outline-info my-2 my-sm-0" type="submit">
                            Search
                        </button>
                        </form>
                        -->
                    </div>
                </nav>
            </div>

            <div class="row m-0">
                <div class="col-md-9 column-body">
                    <router-view></router-view>
                </div>
                <div class="col-md-3 column-body">
                    <div class="col-md-12">
                        <side-box-logged-in v-if="$isLoggedIn"></side-box-logged-in>
                        <side-box-login v-else></side-box-login>

                        <side-box-streams></side-box-streams>

                        <side-box-latest-comments></side-box-latest-comments>

                        <div class="mb-2 rounded">
                            <div class="box-header">
                                <i class="fas fa-book-open"></i>
                                Latest blog posts
                            </div>
                            <div class="box-body">
                                <div class="box-content">Text</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer class="row m-0">
                <div class="col-md-2 section mx-auto my-auto text-center border-0">
                    <img src="./assets/logo-bottom.png">
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Get the game</span>
                    <ul>
                        <li>
                            <a href="http://www.nquake.com">nQuake</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Sections</span>
                    <ul>
                        <li>
                            <router-link to="/">News</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-posts">Blogs</router-link>
                        </li>
                        <li>
                            <router-link to="/forums">Forum</router-link>
                        </li>
                        <li>
                            <router-link to="/maps">Maps</router-link>
                        </li>
                    </ul>
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Social Media</span>
                    <ul>
                        <li>
                            <a href="https://discord.quake.world">Discord chat</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/quakeworld">Facebook</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/qw_tips">Twitter</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Media</span>
                    <ul>
                        <li>
                            <a href="#">Images</a>
                        </li>
                        <li>
                            <a href="#">Video</a>
                        </li>
                        <li>
                            <a href="#">Game content</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-2 section">
                    <span class="section-header">Information</span>
                    <ul>
                        <li>
                            <router-link to="/about">About</router-link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SideBoxLogin from "./components/SideBoxLogin";
import SideBoxLoggedIn from "./components/SideBoxLoggedIn";
import SideBoxStreams from "./components/SideBoxStreams";
import SideBoxLatestComments from "./components/SideBoxLatestComments";

export default {
    components: {
        SideBoxLoggedIn,
        SideBoxLogin,
        SideBoxStreams,
        SideBoxLatestComments
    },
    computed: {
        ...mapGetters({
            $isLoggedIn: "isLoggedIn",
            $currentUser: "user"
        })
    }
};
</script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "stylesheets/app.scss";
</style>
