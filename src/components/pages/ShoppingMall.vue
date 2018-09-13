<template>
    <div>
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3"><img :src="locationIcon" width="100%"></van-col>
                <van-col span="16"><input type="text" class="search-input"></van-col>
                <van-col span="5"><van-button size="mini">查找</van-button></van-col>
            </van-row>
        </div>
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index"><img v-lazy="banner.image" width="100%"></van-swipe-item>
          
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
        <div class="recommend-area">
            <div class="recommend-title">
               商品推荐
            </div>
            <div class="recommend-body">
       <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in recommendGoods" :key="index">
                <div class="recommend-item">
                    <img :src="slide.image" width="80%">
                    <div>{{slide.goodsName}}</div>
                    <div>￥{{slide.price | moneyFilter}} (￥{{slide.mallPrice | moneyFilter}})</div>
                </div>
            </swiper-slide>
        </swiper>
        
    </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
<!--Hot Area-->
<div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
        <van-list>
            <van-row gutter="20">
                <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
                    <!-- <div>{{item.name}}</div> -->
                    <goods-info  :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"></goods-info>
                </van-col>
            </van-row>
        </van-list>
    </div>
</div>
    </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from '../component/goodsInfoComponent'
import { toMoney } from "@/filter/moneyFilter.js";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: {},
      recommendGoods: {},
      floor1: [],
      floor2: [],
      floor3: [],
      swiperOption: {
        slidesPerView: 3
      },
      floorName: {},
      hotGoods:[]
    };
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created() {
    axios({
      url: url.index,
      method: "get"
    })
      .then(res => {
        if (res.status == 200) {
          console.log(res);
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}

.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  flex: 1;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
