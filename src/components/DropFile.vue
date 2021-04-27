<template>

    <div id="container" @drop.prevent="addFile">
      
      <label for="file-upload" class="custom-file-upload">
        <input type="file" id="file-upload">
        <p> Choose a file </p>
      </label>

      <p class='no-wrap'> or drag to upload. </p>

      <p v-if="files.length == 0" class='file-text'> No File Selected </p>

      <ul v-if="files.length > 0">
        <li v-for="file in files" :key="file"> 
          {{ file }}
        </li>
      </ul>

      <svg style="color: #6767a7; margin-top: 0.5em; width:2rem; height:2rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-line-join="round" stroke-width=2 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>

    </div>

    
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    files: Array
  },
})
export default class DropFile extends Vue {
  files : string[] = [];

  addFile(e : any) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ([...droppedFiles]).forEach(f => {
        console.log(f);
  
        this.files.push(f.name)
        
      });
  
  }

}

</script>

<style scoped lang="scss">



#container{
    padding: 20px;
    border-radius: 5px;
    color: gray;
    font-weight: 100;
    background: #f2f2f2;
    display: flex;
    flex-flow: column nowrap;

    justify-content: center;
    align-items: center;

    p, h2{
      margin: 0;
    }

    h2{
      font-family: 'Courier New', Courier, monospace;
    }

    input[type='file'] {
      display: none;
    }

  .custom-file-upload {
    color: rgba(64, 64, 146, 0.912);
    font-weight: 700;
    display: inline-block;
    cursor: pointer;  
  }

  .no-wrap{
      display: inline-block;
  }

  .file-text{
    margin-top: 1em;
    opacity: 0.4;
  }

  ul {
    
    list-style-type: none;
    padding: 0;
    margin: 0.3em;
    margin-bottom: none;


    li {
      max-width: 30ch;
      overflow: hidden;
      text-align: left;
      background: white;
      border-radius: 0.2em;
      margin: 0.3em;

      border: 0.3em solid white;
      
      text-decoration: none;
    }

    li::before{
      display: none;
    }

  }

}


</style>
