<template>
    <div>
    <!--Header_section-->
    <header id="header_wrapper">
        <div class="container">
            <div class="header_box">
                <div class="logo">
                    <a href="#"><img src="@/assets/images/fnlogo.png" alt="logo"></a>
                </div>
                <nav class="navbar-inverse" role="navigation">

                    <div id="main-nav" class=" navbar-collapse navStyle">
                        <ul class="nav navbar-nav" id="mainNav">
                            <li class="active"><a href="/login" class="scroll-link">登录</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    <!--Header_section-->

    <!--Hero_Section-->
    <section id="hero_section" class="top_cont_outer">
        <div class="hero_wrapper">
            <div class="container">
                <div class="hero_section">
                    <div class="row">
                        <div class="col-lg-5 col-sm-7">
                            <div class="top_left_cont zoomIn wow animated">
                                <h2><strong>青鸟快讯</strong> </h2>
                                <p>露从今夜白，月是故乡明。青鸟快讯，垂直区域家乡资讯领军者</p>
                                <a href="javascript:;" v-on:click="modal1 = true" class="read_more2" data-toggle="modal" data-target="#exampleModal">立即下载</a>
                            </div>
                        </div>
                        <!-- Modal -->
                        <Modal
                            v-model="modal1"
                            title="扫码下载App">
                            <img style="width:180px;display:block;padding-top:20px;margin:0 auto;" alt="验证码" src="@/assets/images/code.jpg">
                            <p style="text-align:center;font-size:16px;line-height:38px;color:#000;">扫码下载最新青鸟快讯APP客户端</p>
                        </Modal>
                        <div class="col-lg-7 col-sm-5">
                            <img src="@/assets/images/pic1.png" class="zoomIn wow animated" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Hero_Section-->

    <section class="aboutUs">
        <!--Aboutus-->
        <div class="inner_wrapper ">
            <div class="container">
                <h2>区域垂直快讯</h2>
                <div class="part"></div>
                <div class="inner_section">
                    <div class="row">
                        <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-left"><img src="@/assets/images/pic2.png" class="delay-03s animated wow zoomIn" alt="区域垂直快讯"></div>
                        <div class=" col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-right">
                            <div class=" delay-01s animated fadeInDown wow animated">
                                <h3>远距离观看家乡趣闻，近距离参与家乡大小事，在这里遇见家乡。</h3><br />
                                <p>了解家乡的新鲜事，推广家乡风貌建设，填补区域新闻资讯蓝海，随时随地，查看热点资讯。</p>
                                <p>发现身边有趣事，关心身边好玩事，发文章、视频，让更多人看到实时资讯即可获得奖励分成。 </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Aboutus-->

    <section class="aboutUs">
        <!--Aboutus-->
        <div class="inner_wrapper area-background" style="padding-top:1px;">
            <div class="container">
                <h2>一站式功能 助力成长</h2>
                <div class="part"></div>
                <div class="inner_section">
                    <div class="row">
                        <div class=" col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left">
                            <div class=" delay-01s animated fadeInDown wow animated">
                                <h3>资源升级，功能进阶，丰富的内容类型支持 </h3><br />
                                <p>多样的内容接入形式，包括文章、短视频、短内容、等类型。</p>
                                <p>内容有温度·算法有态度 强大的个性化推荐技术，在海量用户帮助你更好的地找到作品的读者与粉丝，完成自媒体创作的冷启动。</p>
                                <p>入驻平台即可享受广告分成，原创文章更是收益翻倍，活动、平台补贴多种收益并行，让你的创作更有价值。</p>
                                <p>更合理的流量分配，更完善的原创保护，持续和强化平台开放性。</p>
                                <p>千万级用户体量，百万级日活产品，享受移动互联网的最后一波红利。</p>
                            </div>
                        </div>
                        <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right"><img src="@/assets/images/pic3.png" class="delay-03s animated wow zoomIn" alt="一站式功能 助力成长"></div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Aboutus-->

    <section class="aboutUs">
        <!--Aboutus-->
        <div class="inner_wrapper">
            <div class="container">
                <h2>欢迎入驻 </h2>
                <div class="part"></div>
                <div class="inner_section">
                    <div class="row">
                        <div class=" col-lg-4 col-md-4 col-sm-4 col-xs-12 pull-right"><img src="@/assets/images/pic4.png" class="delay-03s animated wow zoomIn" alt="欢迎入驻"></div>
                        <div class=" col-lg-7 col-md-7 col-sm-7 col-xs-12 pull-left">
                            <div class=" delay-01s animated fadeInDown wow animated">
                                <h3>为创作，保驾护航，从这里开启自己的自媒体创作之路</h3><br />
                                <p> 通过优质家乡内容引流、模块化资讯展示、优质广告系统、同乡好友互动。</p>
                                <p> 四大核心系统的不断深化研发、升级，为全国近2900县域新媒体和个人创作者建立优质资讯平台。</p>
                                <p> 实现本地资讯共享，使全国用户都能找到自己的家乡资讯、发布家乡资讯。新鲜事、身边事想看就看。</p>
                                <p> 欢迎优秀公众号经营者、网站经营者、自媒体人、文化传媒公司加入实现共赢。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--client_logos-->
    <!--Footer-->
    <footer class="footer_wrapper" id="contact">
        <div class="container">
            <section class="page_section contact" style="padding-bottom:0 !important;">
                <div class="contact_section">
                    <h2>联系我们</h2>
                    <div class="row">
                        <div class="col-lg-6">
                            <h4>商务邮箱</h4>
                            <p>zhihuiyunmei@qingniaokx.com</p>
                            <br>

                            <h4>联系客服</h4>
                            <p>客服微信号：qingniaokx003</p>
                            <p>客服QQ号：1574045570</p>
                            <p>联络邮箱：qnkx@qingniaokx.com</p>
                            <p>工作时间：9:30～11:30  13:30～18:00（国家法定节假日除外）</p>
                            <br>

                        </div>
                        <div class="col-lg-6">
                            <h4>联系地址</h4>
                            <p>北京市北京经济技术开发区科创十三街18号院6号楼8层804</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
        <div class="container">
            <div class="footer_bottom">
                京ICP备19004034号-3 |
                Copyright &copy; 2019. 北京智慧云媒有限公司版权所有
            </div>
        </div>
    </footer>

    </div>

</template>

<style lang="less">
    @import "./sitehome.less";
</style>

<script>
export default {
  data () {
    return {
      modal1: false
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
