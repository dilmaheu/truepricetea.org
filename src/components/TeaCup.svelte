<script lang="ts">
  import HugMug from "./HugMug.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { TeacupGraph } from "../utils/api";
  export let content: TeacupGraph;
  export let index: number;

  const percentage = writable(0);
  let wrapper: HTMLDivElement;
  let isVisible = false;

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        isVisible = true;
      } else {
        isVisible = false;
      }
    });
  };

  function scrollHandler() {
    if (isVisible) {
      const scrolled = -(
        window.pageYOffset +
        wrapper.getBoundingClientRect().top -
        window.innerHeight
      );

      if (scrolled < wrapper.offsetHeight) {
        $percentage = scrolled / wrapper.offsetHeight;
      }
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(handleIntersection);
    observer.observe(wrapper);
    window.addEventListener("scroll", scrollHandler, true);
  });
</script>

<div class="bc">
  <div class="t-wrapper container" bind:this={wrapper}>
    <div class="teacup">
      <HugMug {percentage} data={content} {index} />
    </div>
  </div>
</div>

<style>
  .bc {
    background-color: rgb(121, 121, 234);
  }

  .t-wrapper {
    height: 4500px;
    padding: 200px 0;
  }

  .teacup {
    position: sticky;
    left: 50%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
