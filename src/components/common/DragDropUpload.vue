<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-xs font-semibold text-slate-300">
      {{ label }}
    </label>

    <!-- Drag and drop zone -->
    <div 
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
      :class="[
        isDragging ? 'border-sky-500 bg-sky-950/20' : 'border-slate-700 bg-slate-800/50 hover:border-sky-500/80',
        'border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-colors relative group'
      ]"
    >
      <input 
        type="file" 
        :accept="accept" 
        :multiple="multiple" 
        @change="onFileSelected"
        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
      />
      <div class="space-y-1.5 pointer-events-none">
        <div class="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400 group-hover:text-sky-400 group-hover:border-sky-500/50 transition-colors">
          <i class="fas fa-cloud-arrow-up text-base"></i>
        </div>
        <p class="text-xs font-bold text-white">
          Tarik &amp; Lepas file di sini, atau <span class="text-sky-400">Pilih File</span>
        </p>
        <p class="text-[10px] text-slate-400">
          {{ hint || 'Format PNG, JPG, SVG, atau PDF (Maks. 5 MB)' }}
        </p>
      </div>
    </div>

    <!-- Uploaded Files Preview Cards List -->
    <div v-if="uploadedFiles.length > 0" class="space-y-2 pt-1">
      <div 
        v-for="(file, idx) in uploadedFiles" 
        :key="idx" 
        class="flex items-center justify-between p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs animate-in fade-in"
      >
        <div class="flex items-center gap-2.5 overflow-hidden">
          <img v-if="file.previewUrl" :src="file.previewUrl" class="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-slate-700" alt="Preview" />
          <div v-else class="w-8 h-8 rounded-lg bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center shrink-0">
            <i class="fas fa-file-lines text-xs"></i>
          </div>
          <div class="overflow-hidden">
            <p class="font-bold text-white truncate max-w-[180px] sm:max-w-[240px]">{{ file.name }}</p>
            <p class="text-[10px] text-slate-400">{{ formatSize(file.size) }} &bull; <span class="text-emerald-400 font-semibold">Siap Diunggah</span></p>
          </div>
        </div>

        <button 
          type="button" 
          @click="removeFile(idx)" 
          class="w-7 h-7 rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-800/80 text-rose-400 hover:text-white flex items-center justify-center transition-colors shrink-0" 
          title="Hapus File" 
          aria-label="Hapus File"
        >
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  accept: { type: String, default: 'image/*,.pdf' },
  multiple: { type: Boolean, default: false }
});

const emit = defineEmits(['update:files']);

const isDragging = ref(false);
const uploadedFiles = ref([]);

function formatSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function processFiles(fileList) {
  const newItems = Array.from(fileList).map(file => {
    let previewUrl = null;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }
    return {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl
    };
  });

  if (props.multiple) {
    uploadedFiles.value.push(...newItems);
  } else {
    uploadedFiles.value = newItems;
  }

  emit('update:files', uploadedFiles.value.map(item => item.file));
}

function onDrop(e) {
  isDragging.value = false;
  if (e.dataTransfer && e.dataTransfer.files.length) {
    processFiles(e.dataTransfer.files);
  }
}

function onFileSelected(e) {
  if (e.target.files && e.target.files.length) {
    processFiles(e.target.files);
  }
}

function removeFile(idx) {
  uploadedFiles.value.splice(idx, 1);
  emit('update:files', uploadedFiles.value.map(item => item.file));
}
</script>
