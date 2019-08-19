
<template>
  <div class="uploadphotos">
    <MyHeader title="信息验证" />
    <div class="bgline"></div>
    <div class="photos">
      <h3>请上传手持身份证照</h3>
      <p>请按照示例图拍摄，保持身份证信息清晰可见</p>
      <div class="frontphotos">
        <img :src="imgsrc" @click="showActionSheet" />
      </div>
    </div>
    
    <div class="complete" v-if="status">
      <MyButton content="重新拍摄" :btnStyle="btnStyle1" @click.native="uploadfile" />
      <MyButton content="提交" :btnStyle="btnStyle2" @click.native="uploadfile" />
    </div>

    <div class="complete" v-else>
      <MyButton content="开始拍摄" :btnStyle="btnStyle3" @click.native="uploadfile" />
    </div>
    <div class="service">
      <Service />
    </div>
    <!-- <input type="file" id="file" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png"/> -->

   
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue";
import MyButton from "@/components/base/MyButton";
import MyHeader from "@/components/base/MyHeader";
export default {
  name: "TakePhoto",
  props: {},
  data() {
    let that = this;
    return {
      username: "张某某",
      btnStyle1: {
        width: "40%",
        height: "0.4rem",
        background: "#14beb4",
        borderRadius: "0.2rem",
        color: "white"
      },
      btnStyle2: {
        width: "40%",
        height: "0.4rem",
        background: "#3964fe",
        borderRadius: "0.2rem",
        color: "white"
      },
      btnStyle3: {
        width: "100%",
        height: "0.4rem",
        background: "#3964fe",
        borderRadius: "0.2rem",
        color: "white"
      },
      imgsrc: require("@/assets/img/takephotos/holdidcard@2x.png"),
        status:false
    }
  },
  created() {},
  methods: {
    showActionSheet() {
      this.sheetVisible = true
    },
    getLibrary() {},
    uploadfile() {
      let file = document.getElementById("file")
      let FormDataObject = new FormData()
      FormDataObject.append('front',file.files[0])
    },
    changeImage(e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.imgsrc = this.result
      };
    }
  },
  computed: {},
  mounted() {
    this.getLibrary();
  },
  components: {
    MyButton,
    Service,
    MyHeader
  },
  beforeDestroy() {}
};
</script>
<style scoped>
.bgline{
    height:0.1rem;
    background:#e4ecfd
}
.uploadphotos{
    height:100vh;
    background:white;
    position:relative;
}
.photos h3 {
  font-size: 0.2rem;
  text-align: left;
  margin-top: 0.26rem;
  padding-left:0.36rem;
  box-sizing: border-box;
}
.photos p {
  font-size: 0.12rem;
  text-align: left;
  color: #8c8c8c;
  padding-left:0.36rem;
  box-sizing: border-box;
  margin-bottom: 0.4rem;
  margin-top: 0.14rem;
}


.frontphotos,
.reversephotos {
  width: 3rem;
  margin: 0 auto;
}

.frontphotos img,
.reversephotos img {
  width: 100%;
}

.service {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0.3rem;
}

.complete {
  padding: 0 0.34rem;
  box-sizing: border-box;
  margin-top: 0.3rem;
  display:flex;
  justify-content: space-between;
}
</style>