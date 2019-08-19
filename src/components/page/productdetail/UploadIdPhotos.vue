<template>
  <div class="uploadphotos">
    <MyHeader title="信息验证" />
    <div class="photos">
      <h3>{{'请上传'+ username +'本人身份证正反面照片'}}</h3>

      <div class="frontphotos">
        <img :src="IdPASide" @click="showActionSheet('IdPASide')" />
      </div>
      <p class="fronttext">上传身份证正面照片</p>

      <div class="reversephotos">
        <img :src="IdPBSide" @click="showActionSheet('IdPBSide')"/>
      </div>
      <p class="reversetext">上传身份证反面照片</p>
      <div class="line"></div>
    </div>
    <div class="errorimg">
      <dl>
        <dt>
          <img src="@/assets/img/takephotos/standard@2x.png" />
        </dt>
        <dd>标准</dd>
      </dl>
      <dl>
        <dt>
          <img src="@/assets/img/takephotos/damage@2x.png" />
        </dt>
        <dd>证件缺失</dd>
      </dl>
      <dl>
        <dt>
          <img src="@/assets/img/takephotos/obscure@2x.png" />
        </dt>
        <dd>照片模糊</dd>
      </dl>
      <dl>
        <dt>
          <img src="@/assets/img/takephotos/reflectlight@2x.png" />
        </dt>
        <dd>闪光强烈</dd>
      </dl>
    </div>
    <div class="complete">
      <MyButton content="上传" :btnStyle="btnStyle" @click.native="uploadfile" />
    </div>
    <div class="service">
      <Service />
    </div>
    <input type="file" id="IdPASide" @change="changeImage($event,'IdPASide')" accept="image/gif,image/jpeg,image/jpg,image/png"/>
    <input type="file" id="IdPBSide" @change="changeImage($event,'IdPBSide')" accept="image/gif,image/jpeg,image/jpg,image/png"/>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Service from "@/components/base/Service.vue"
import MyButton from "@/components/base/MyButton"
import MyHeader from "@/components/base/MyHeader"
import { uploadPhoto, photoUpload } from "@/requestDataInterface"
export default {
  name: "UploadIdPhotos",
  props: {},
  data() {
    let that = this
    this.type = "IdPASide"
    return {
      username: "张某某",
      btnStyle: {
        width: "100%",
        height: "0.4rem",
        background: "#3965ff",
        borderRadius: "0.2rem",
        color: "white"
      },
      actions: [{ name: "从相册中选择", method: that.getLibrary }],
      sheetVisible: false,
      IdPASide: require("@/assets/img/takephotos/reverseidcard@2x.png"),
      IdPBSide: require("@/assets/img/takephotos/frontidcard@2x.png")
    }
  },
  created() {},
  methods: {
    showActionSheet(type) {
      this.sheetVisible = true
      this.type = type
    },
    getLibrary() {
      let file = document.getElementById(this.type)
      file.click()
    },
    uploadfile() {
      let IdPASide = localStorage.getItem('IdPASide')
      let IdPBSide = localStorage.getItem('IdPBSide')
      let IdNo = this.$route.params.IdNo
      let CifName = this.$route.params.CifName
      photoUpload({ IdPASide, IdPBSide, CifName, IdNo}).then(
        res => {
          if(res.code == 2000 && res.result.IdPNo){
            localStorage.setItem('IdPNo',res.result.IdPNo)
            this.$router.push({name:'UploadSucc',params:{}})
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
      
    },
    changeImage(event,type) {
      let reader = new FileReader()
      let FormDataObject = new FormData()
      let that = this
      let file = event.target.files[0]
      FormDataObject.append('filea',file)
      FormDataObject.append('type',type)
      uploadPhoto(FormDataObject).then(res => {
        console.log(res)
        if(res.code==2000){
          localStorage.setItem(type,res.result)
        }
      }).catch(err => {
        console.log(err)
      })
      
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that[type] = this.result
      };
    }
  },
  computed: {},
  mounted() {
  },
  components: {
    MyButton,
    Service,
    MyHeader
  },
  beforeDestroy() {
    localStorage.setItem('IdPASide','')
    localStorage.setItem('IdPBSide','')
  }
};
</script>
<style scoped>
#IdPASide,#IdPBSide {
  display:none;
}
.photos h3 {
  font-size: 0.2rem;
  text-align: center;
  margin: 0.3rem 0;
}
.photos p {
  font-size: 0.15rem;
  text-align: center;
  margin: 0.15rem 0 0.3rem;
  color: #8c8c8c;
}
.photos .line {
  width: 3.5rem;
  margin: 0 auto;
  background: #c7d9fd;
  height: 1px;
}
.errorimg {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.errorimg dl {
  width: 0.82rem;
  font-size: 0.12rem;
  text-align: center;
}

.errorimg dl dt img {
  width: 100%;
}
.errorimg dl dt {
  margin-bottom: 0.1rem;
}

.frontphotos,
.reversephotos {
  width: 1.96rem;
  margin: 0 auto;
}

.frontphotos img,
.reversephotos img {
  width: 100%;
}

.service {
  margin-top: 0.2rem;
}

.complete {
  padding: 0 0.14rem;
  box-sizing: border-box;
  margin-top: 0.28rem;
}
</style>