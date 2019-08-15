<template>
  <v-layout
    row
    wrap
  >
    <v-flex
      sm6
      xs12
    >
      <code v-if="device">{{ device.label }}</code>
      <vue-web-cam
        ref="webcam"
        :device-id="deviceId"
        width="100%"
        @started="onStarted"
        @stopped="onStopped"
        @error="onError"
        @cameras="onCameras"
        @camera-change="onCameraChange"
      />
      <div>
        <v-btn
          color="success"
          @click="onCapture"
        >
          Tomar Foto
        </v-btn>
        <v-btn
          color="warning"
          @click="onStart"
        >
          Encender Camara
        </v-btn>
        <v-btn
          color="info"
          @click="onStop"
        >
          Parar Camara
        </v-btn>
        <div class="col-md-12">
            <select v-model="camera">
              <option class="seleccionar">Seleccionar Camara</option>
              <option v-for="device in devices"
                      :key="device.deviceId"
                      :value="device.deviceId">{{ device.label }}</option>
            </select>
          </div>
      </div>
    </v-flex>
    <v-form
      ref="form"
      v-model="validForm"
      lazy-validation
      @submit.prevent="submitPatchRegister"
    >
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout
          row
          wrap
        >
        <v-flex
          xs12
          md6
        >
        <center>
        <h2>Foto</h2>
        <figure class="figure" name='image'>
          <img
            :src="img"
            class="foto"
          />
        </figure>
        </center>
        <center>
        <v-btn
          type="submit"
          color="success"
          class="save"
        >
          GUARDAR FOTO
        </v-btn>
        </center>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { WebCam } from 'vue-web-cam'

export default {
  middleware: 'auth',
  components: {
    'vue-web-cam': WebCam
  },
  data () {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      formErrors: {},
      form: {
        image_path: '',
        image_url: ''
      },
      video: '',
      validForm: true,
      processingForm: false
    }
  },
  computed: {
    ...mapState({
      currentRegistered: state => state.register.currentRegistered
    }),
    device: function () {
      return this.devices.find(n => n.deviceId === this.deviceId)
    }
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    }
  },
  created () {
    this.getRegistered({ Id: this.$route.params.id })
  },
  methods: {
    ...mapActions({
      uploadImage: 'register/uploadImage',
      getRegistered: 'register/getRegistered',
      patchImage: 'register/patchImage'
    }),
    onCapture () {
      this.img = this.$refs.webcam.capture()
      this.$refs.webcam.stop()
      let img = this.img
      this.uploadImage({ img })
        .then(response => {
          this.form.image = response.data.image_url
          this.form.image_path = response.data.image_path
          console.log(response.data.image_path)
        })
    },
    submitPatchRegister () {
      this.processingForm = true
      this.patchImage({
        Id: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false
          this.$router.push({ name: 'reporte', params: { id: this.$route.params.id } })
        })
        .catch((error) => {
          this.processingForm = false
          this.formErrors = error.response.data.errors || {}
        })
    },
    onStarted (stream) {
      console.log('On Started Event', stream)
    },
    onStopped (stream) {
      console.log('On Stopped Event', stream)
    },
    onStop () {
      this.$refs.webcam.stop()
    },
    onStart () {
      this.$refs.webcam.start()
    },
    onError (error) {
      console.log('On Error Event', error)
    },
    onCameras (cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange (deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    }
  }
}

</script>
<style scoped>
.save{
  margin-top: 5%;
}
.figure {
   margin:-5% -40% 0%;
   width: 177.777%;
  transform:
  scale(1.5);
}
.foto{
  width: 40%;
  height: 40%;
}
.seleccionar{
  color: green;
}
</style>
