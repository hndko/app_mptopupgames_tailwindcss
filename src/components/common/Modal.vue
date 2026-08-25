<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" 
           class="fixed inset-0 w-full h-full min-h-screen z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
           role="dialog" 
           aria-modal="true"
           @click.self="$emit('close')">
        <div :class="[maxWidthClass || 'max-w-lg']" 
             class="modal-content bg-slate-900 border border-slate-800 rounded-3xl w-full p-6 shadow-2xl space-y-4 my-auto relative">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <i v-if="icon" :class="icon" class="text-sky-400"></i>
              <span>{{ title }}</span>
            </h3>
            <button type="button" @click="$emit('close')" 
                    class="w-8 h-8 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors btn-press" 
                    title="Tutup Modal" aria-label="Tutup Modal">
              <i class="fas fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Body -->
          <div class="text-xs sm:text-sm text-slate-300">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal Dialog'
  },
  icon: {
    type: String,
    default: ''
  },
  maxWidthClass: {
    type: String,
    default: 'max-w-lg'
  }
});

defineEmits(['close']);
</script>
