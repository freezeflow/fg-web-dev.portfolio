import { defineStore } from "pinia";
import TestimonialServices from '@/utils/testimonial.services.js'
import { useToast } from "vue-toastification";

const toast = useToast();
const fileService = new TestimonialServices();

export const useTestimonialStore = defineStore("testimonial", {
  state: () => ({
    testimonial: null,
    loading: false,
    error: null,
  }),

  actions: {
    safeParse(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (err) {
        toast.error(`Corrupted ${key} cache. Resetting...`);
        localStorage.removeItem(key);
        return null;
      }
    },

    saveCache(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    syncTestimonialCache() {
      if (this.testimonial) this.saveCache("testimonial", this.testimonial);
    },

    clearTestimonialCache() {
      localStorage.removeItem("testimonial");
    },

    async handleRequest(fn, ...args) {
      this.loading = true;
      this.error = null;

      try {
        return await fn(...args);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        this.error = new Error(message);
        toast.error(message);
        throw this.error;
      } finally {
        this.loading = false;
      }
    },

    async getTestimonial(id) {
      // 1. hydrate from cache first
      const cached = this.safeParse("testimonial");
      if (cached && cached._id === id) {
        this.testimonial = cached;
      }

      // 2. fetch latest data
      const res = await this.handleRequest(
        fileService.getTestimonial.bind(fileService),
        id
      );

      this.testimonial = res.testimonial;
      this.syncTestimonialCache();
    },

    async createTestimonial(form) {
      const res = await this.handleRequest(
        fileService.createTestimonial.bind(fileService),
        form
      );

      this.testimonial = res.testimonial;
      this.syncTestimonialCache();
      toast.success("Testimonial created");
    },

    async updateTestimonial(id, form) {
      const res = await this.handleRequest(
        fileService.updateTestimonial.bind(fileService),
        id,
        form
      );

      this.testimonial = res.testimonial;
      this.clearTestimonialCache();
      this.syncTestimonialCache();

      toast.success("Testimonial updated");
    },

    async deleteTestimonial(id) {
      await this.handleRequest(
        fileService.deleteTestimonial.bind(fileService),
        id
      );

      this.testimonial = null;
      this.clearTestimonialCache();
    },
  },
});
