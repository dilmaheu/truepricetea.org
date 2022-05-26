<script lang="ts">
  import HugMug from "./HugMug.svelte";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const percentage = writable(0);
  let wrapper: HTMLDivElement;
  let isVisible = false;

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        console.log("on");
        isVisible = true;
      } else {
        isVisible = false;
        console.log("off");
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

<div class="wrapper" id="teacup-wrapper" bind:this={wrapper}>
  <div class="teacup">
    <HugMug {percentage} />
  </div>
</div>

<style>
  .wrapper {
    height: 4000px;
    padding: 200px 0;
    background-color: rgb(121, 121, 234);
  }

  .teacup {
    position: sticky;
    left: 50%;
    top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>
