/** 
 * 全局组件
 */
import Vue from 'vue'
import SvgIcon from '@/components/svg-icon'
import Page from '@/components/page'
import UploadSingleImage from '@/components/upload-single-image'
import Empty from '@/components/empty'
import Progress from '@/components/progress/progress'
import Tinymce from '@/components/tinymce'
import Ckeditor from '@/components/ckeditor'

Vue.component('ComSvgIcon', SvgIcon)
Vue.component('ComPage', Page)
Vue.component('ComUploadSingleImage', UploadSingleImage)
Vue.component('ComEmpty', Empty)
Vue.component('ComProgress', Progress)
Vue.component('ComTinymce', Tinymce)
Vue.component('ComCkeditor', Ckeditor)
