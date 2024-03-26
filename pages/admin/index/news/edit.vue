<template>
  <AdminPageHeader :pageName="pageName"></AdminPageHeader>
  <div class="admin-container">
    <div class="image-label label">文章縮圖<span class="min-description">(請上傳解析度為 2880*2112 的圖片)</span></div>
    <div class="image-contain">
      <div class="image-contain-height">
        <div class="image-contain-img" v-if="titleImage" :style="`background-image: url(${titleImage})`"></div>
        <v-btn class="file-input-contain" variant="outlined">
          <span class="text">上傳</span>
          <v-file-input
            class="file-input"
            v-model="titleImageInput"
            hide-details
            :prepend-icon="none"
            @update:modelValue="titleImageUpload"
            accept="image/*"
          ></v-file-input>
        </v-btn>
      </div>
    </div>
    <div class="three-contain">
      <div>
        <div class="label">文章標題</div>
        <v-text-field v-model="title" placeholder="請輸入文章標題..." hide-details></v-text-field>
      </div>
      <div>
        <div class="label">文章類別</div>
        <v-select
          v-model="category"
          :items="categoryList"
          item-title="name"
          item-value="id"
          placeholder="請選擇文章類別..."
        ></v-select>
      </div>
      <div>
        <div class="label">文章關鍵字</div>
        <v-autocomplete
          v-model="keyword"
          :items="keywordList"
          item-title="keyword"
          item-value="id"
          placeholder="請選擇文章關鍵字..."
          multiple
          chips
        ></v-autocomplete>
      </div>
    </div>
    <div class="single-contain">
      <div class="label">文章描述</div>
      <v-textarea v-model="description" placeholder="請輸入文章描述..."> </v-textarea>
    </div>
    <div class="editor">
      <div class="label">內容編輯</div>
      <Editor
        api-key="orci8sjv71om1ti4iev70oaumx5j6t7m88czmaun5nf88zx3"
        v-model="editorValue"
        :init="editorInit"
        ref="editorRef"
      />
    </div>
    <div style="text-align: right; margin-top: 20px">
      <v-btn color="primary" @click="previewEditor">預覽</v-btn>
    </div>
  </div>
  <v-dialog v-model="isPreviewDialogOpen">
    <v-card class="preview-layout">
      <div class="preview-title">
        <span>預覽文章內容</span>
      </div>
      <div class="preview-contain">
        <div class="banner">
          <div class="banner-height">
            <div class="banner-image" v-if="titleImage" :style="`background-image: url(${titleImage})`"></div>
            <div class="banner-title">{{ title }}</div>
          </div>
        </div>
        <div class="preview-article">
          <div v-html="previewContent"></div>
          <div class="chip-list">
            <v-chip variant="outlined" v-for="(item, index) in keyword" :key="`preview-chip_${index}`">{{
              KeywordObject[item]
            }}</v-chip>
          </div>
        </div>
      </div>
      <div class="preview-footer">
        <v-btn variant="outlined" @click="isPreviewDialogOpen = false">取消</v-btn>
        <v-btn>確認發佈</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import Category from '@/utils/category.ts';
import Keyword from '@/assets/fake/keyword.json';
import Editor from '@tinymce/tinymce-vue';
useSeoMeta({
  title: '新聞文章編輯'
});
const pageName = ref('新增新聞文章');
const title = ref('');
const description = ref('');
const category = ref(null);
const categoryList = Category.news;
const KeywordObject = ref({});
watch(
  Keyword,
  () => {
    Keyword.forEach(item => {
      KeywordObject.value[String(item.id)] = item.keyword;
    });
  },
  {
    immediate: true
  }
);
const keyword = ref(null);
const keywordList = Keyword;
const route = useRoute();
const editorValue = ref(null);
const imageList = ref([]);
const editorInit = ref({
  plugins: ['image', 'link'],
  toolbar: `undo redo | link image | fonts | bold italic backcolor | \
  alignleft aligncenter alignright alignjustify | \
  `,
  image_title: true,
  file_picker_types: 'image',
  file_picker_callback: (callback, value, meta) => {
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        var id = 'blobid' + new Date().getTime();
        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        /* call the callback and populate the Title field with the file name */
        callback(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }
});
const titleImage = ref(null);
const titleImageInput = ref(null);
const titleImageUpload = eventFile => {
  const file = eventFile[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      titleImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};
const editorRef = ref(null);
watch(editorRef, value => {
  console.log(value);
});
const getImageBlobFromUrl = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error('圖片請求失敗'));
      }
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
};
const previewContent = ref(null);
const previewEditor = async () => {
  let editorItem = editorRef.value.getEditor();
  // let images = editorItem.dom.select('img');
  // if (images.length > 0) {
  //   for (let i = 0; i < images.length; i++) {
  //     const img = images[i];
  //     const imageUrl = img.src;
  //     const blob = await getImageBlobFromUrl(imageUrl);
  //     imageList.value.push({
  //       title: img.title,
  //       blob: blob
  //     });
  //     img.setAttribute('src', 'https://i.imgur.com/XFptYOL.jpg');
  //     console.log(editorItem.getContent());
  //     previewContent.value = editorItem.getContent();
  //     openPreviewDialog();
  //     // console.log('success');
  //   }
  // } else {
  //   previewContent.value = editorItem.getContent();
  //   openPreviewDialog();
  // }
  previewContent.value = editorItem.getContent();
  openPreviewDialog();
};
const upload = async () => {};
if (route.query.id) {
  pageName.value = '編輯新聞文章';
}
const isPreviewDialogOpen = ref(false);
const openPreviewDialog = () => {
  isPreviewDialogOpen.value = true;
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/_varible.scss';
.image-label {
  margin: 0 auto;
  display: flex;
  width: 25%;
  align-items: baseline;
  .min-description {
    font-size: 14px;
    color: $neutral-2;
  }
}
.image-contain {
  margin: 0 auto;
  width: 25%;
  margin-bottom: 20px;
  &-height {
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 4px;
    padding-bottom: 73%;
    position: relative;
    .file-input-contain {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      .v-btn__content {
        position: relative;
      }
      .file-input {
        position: absolute;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  &-img {
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
  }
}
.three-contain {
  display: flex;
  margin-bottom: 20px;
  & > div {
    flex: 1;
    margin-right: 20px;
    &:last-of-type {
      margin-right: 0;
    }
  }
}
.single-contain {
  margin-bottom: 20px;
}
.preview-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  .preview-title {
    position: fixed;
    flex: 0;
    height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid $neutral-2;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    z-index: 3;
  }
  .preview-contain {
    flex: 1;
    z-index: 2;
    margin-top: 60px;
    margin-bottom: 60px;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    overflow-y: scroll;
    .banner {
      width: 100%;
      margin-bottom: 20px;
      overflow: hidden;
      &-height {
        padding-bottom: 73%;
        position: relative;
      }
      &-image {
        position: absolute;
        width: 100%;
        height: 100%;
        background-position: center center;
        z-index: 2;
        background-size: cover;
      }
      &-title {
        position: absolute;
        z-index: 3;
        font-size: 48px;
        font-weight: 700;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
      }
    }
    .chip-list {
      margin: 20px 0;
      .v-chip {
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .preview-article {
      padding: 0 40px;
    }
  }
  .preview-footer {
    flex: 0;
    bottom: 0;
    position: fixed;
    height: 60px;
    padding: 0 20px;
    border-top: 1px solid $neutral-2;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    z-index: 3;
    .v-btn:first-of-type {
      margin-right: 10px;
    }
  }
}
</style>
