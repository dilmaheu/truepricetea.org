<script lang="ts">
  import { Writable } from "svelte/store";
  import { TeacupGraph } from "../utils/api";
  export let percentage: Writable<number>;
  export let data: TeacupGraph;
  export let index: number;

  const description = data.description;
  let items = data.teacup_graph_item;

  const colorHelper = "#7979ea";

  const offset1 = 0.15;
  const offset2 = 0.32;
  const offset3 = 0.46;
  // const offset1 = 0.25;
  // const offset2 = 0.44;
  // const offset3 = 0.65;

  $: detail1Percentage = (($percentage - offset1) * 100) / 0.15;
  $: detail2Percentage = (($percentage - offset2) * 100) / 0.16;
  $: detail3Percentage = (($percentage - offset3) * 100) / 0.18;

  const offset4 = 0.65;
  $: hideHelper = $percentage < offset4;

  $: helperPercentage =
    $percentage < offset4 ? 0 : (($percentage - offset4) * 253) / 0.2;

  const graphHeight = 253;
  items.sort((a, b) => a.percentage - b.percentage);

  let itemsWithHeight = items.map((item) => {
    let height = (item.percentage * graphHeight) / 100;
    return { ...item, height };
  });

  itemsWithHeight = itemsWithHeight.map((item, i) => {
    if (i > 0) item.height += itemsWithHeight[i - 1].height;
    return item;
  });
  itemsWithHeight.sort((a, b) => b.height - a.height);
</script>

<div class="wrapper">
  <!--?xml version="1.0" encoding="UTF-8"?-->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620.31 749.34">
    <defs>
      <linearGradient id={`detail-1-${index}`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-opacity="1" stop-color="#ffffff" />
        <stop
          offset={`${detail1Percentage}%`}
          stop-opacity="1"
          stop-color="#ffffff"
        />
        <stop
          offset={`${detail1Percentage}%`}
          stop-opacity="0"
          stop-color="#ffffff"
        />
        <stop offset="100%" stop-opacity="0" stop-color="#ffffff" />
      </linearGradient>
      <linearGradient id={`detail-2-${index}`} x1="0.5" y1="0" x2="0.5" y2="1">
        <stop
          offset={`${detail2Percentage}%`}
          stop-opacity="1"
          stop-color="#ffffff"
        />
        <stop
          offset={`${detail2Percentage}%`}
          stop-opacity="1"
          stop-color="#ffffff"
        />
        <stop offset="0%" stop-opacity="0" stop-color="#ffffff" />
        <stop offset="100%" stop-opacity="0" stop-color="#ffffff" />
      </linearGradient>
      <linearGradient id={`detail-3-${index}`}>
        <stop
          offset={`${detail3Percentage}%`}
          stop-opacity="1"
          stop-color="#ffffff"
        />
        <stop
          offset={`${detail3Percentage}%`}
          stop-opacity="1"
          stop-color="#ffffff"
        /><stop offset="0%" stop-opacity="0" stop-color="#ffffff" />
        <stop offset="100%" stop-opacity="0" stop-color="#ffffff" />
      </linearGradient>
    </defs>

    {#each itemsWithHeight as item}
      <rect
        x="56"
        y={360 + 255 - item.height}
        width="384px"
        height={item.height}
        style={`fill: ${item.color}; stroke:none;`}
      />
    {/each}

    <rect
      x="56"
      y={360 - helperPercentage}
      width="385px"
      height={256}
      style={`fill: ${colorHelper}; stroke:none;`}
    />

    <rect
      x="55"
      y={-90}
      width="386px"
      height={453}
      style={`fill: ${colorHelper}; stroke:none;`}
      class:hideHelper
    />

    <path
      d="M274.2,.6c-3.3,.5-10.4,2.3-15.7,4.1-20.8,6.7-32.9,19.7-35.2,37.7-.9,6.8,.6,6.6,4.7-.4,8.5-14.5,20-20.4,39.9-20.4,24.9,0,45.5,8.4,62.4,25.4,12.1,12.2,20,25.8,23.5,40.4,1.8,7.3,2,10.8,1.6,22.2-.5,14.7-2.4,23.6-7.7,36.3-5.9,14.2-11.3,20.8-43.1,52.9-31.9,32.2-37.9,39.5-45.9,56.2-5.4,11.3-6.7,19.1-5.1,29.9,1.3,8.7,3.6,13.8,6.9,15.6,1.8,1,2,.5,2.4-7.2,.8-12.2,3.7-17.8,15.1-29.4,5.1-5.3,15.9-14.5,24.2-20.7s22-16.4,30.5-22.8c17.5-13,28.5-23.4,36.8-34.7,29.5-39.7,32.2-97.7,6.6-136.3-14.8-22.3-41-40.3-67.9-46.9-9.4-2.3-25.5-3.2-34-1.9Z"
      fill={`url(#detail-1-${index})`}
    />
    <path
      d="M139.2,84.1c-26.6,5.9-49.4,25.4-60.5,51.4-11.3,26.6-10.3,60.7,2.6,88,14.4,30.6,43.5,53,83.2,64,5.9,1.6,16.6,4.6,23.7,6.6,24.7,6.8,33.7,13.3,38.6,27.7l1.7,5.1,2.8-4.3c6-9,3.8-24.8-5-36.8-7.8-10.5-16.8-17.1-46.6-33.7-21.9-12.3-30.4-18-40.3-27.4-9.5-9.1-15.8-18.4-19.9-29.3-2.6-7.1-3.1-10.1-3.5-20.3-.9-21.1,4.2-36,16.2-48.1,10.1-10.1,23.6-15.7,38-15.7,16-.1,32.5,7.7,48.3,22.7,7.4,7.1,9.5,8.7,10.3,7.5,1.4-2.1,.4-5.3-5.3-16.9-4.5-9.2-6.3-11.6-14.2-19.5-7.6-7.5-10.7-9.9-18.6-13.8-12.7-6.3-22.6-8.7-35.4-8.6-5.6,0-12.8,.7-16.1,1.4Z"
      fill={`url(#detail-2-${index})`}
    />
    <path
      d="M471.2,346c-7.1,2.3-15.4,4.9-18.3,5.6-6.5,1.5-10.5,5.2-12.7,12-1.4,4.3-1.7,9.7-1.6,37.8,.1,18,.2,38.3,.3,45.2s-.2,19.5-.6,28-.9,21.1-1.1,28c-.6,22-3.5,33.6-12.6,50.4-4.5,8.3-7.3,11.8-16.9,21.5-6.3,6.4-13.2,12.7-15.3,14.1s-5.7,4-8,5.8c-11.6,9-41,17.3-67.7,19.1-1.4,0-23.6,.3-49.5,.6-51.6,.5-89.4-.6-102.5-2.8-10-1.8-25.1-5.5-26.5-6.6-.5-.5-2.3-1.3-4-1.8-6.4-2.2-17.6-10.2-26.1-18.4-29-28.1-38.4-42.4-45.4-68.9-4.9-18.5-5.3-24.7-5.4-91.5l-.1-62-2.7-4.6c-2.2-3.7-4-5.2-9.2-7.8-7-3.4-11.3-4.3-30.4-6.1-15-1.5-16.1-1-14.2,6.1,.8,2.8,1.3,14.2,1.4,31.4,.1,14.9,.5,27.5,.8,28.1,.4,.5,1.1,12.7,1.7,26.9,1.8,42.9,2.1,48.5,3.7,62,2.3,18.9,9.2,47.7,14.9,62,9.4,23.6,16.9,36,33.3,54.7,15.9,18,44.2,46.2,54.2,54,10.3,8,23.2,16.1,31.8,20,4.9,2.2,6.2,3.3,6.2,5.1,0,2-.8,2.4-9.3,3.9-14.8,2.8-21.9,5.3-26.2,9.5-4.8,4.7-6.8,9.3-5.9,14.1,1.7,9.6,4.3,11.1,30,17.5,26.9,6.8,39.7,8.7,66.4,9.9,26.6,1.1,108.5,.4,128.5-1.1,33-2.6,81.9-9.3,92.6-12.7,15.5-4.9,22.7-15.6,16.9-25.2-1.1-1.8-3.4-4.1-5.1-5.1-3.4-2.1-20.3-6.7-37.9-10.4-6.3-1.4-13.3-3.2-15.4-4.1-5.3-2.2-4.9-2.5,15.4-12.8,53.8-27.5,74.4-47.1,82.6-78.6,1.4-5.3,3-10.3,3.7-11.1,2.2-2.6,7.1-3.9,18.2-4.6,30.7-1.8,51.4-8.8,76-25.6,18.4-12.5,28-21.9,33.5-32.9,3.9-7.7,4.7-11.4,6.6-29,3-29-.5-48-13-69.5-6-10.3-18.3-22.3-27.6-26.8-11.4-5.7-21.1-6.9-72.2-9.6-6.4-.3-12.2-1.1-12.8-1.7s-1.8-5.6-2.6-11c-1.6-10.7-.9-19.5,2.1-24,3.1-4.8,1-10.4-4-10.4-1.3,0-2.9-.2-3.7-.5-.7-.2-7.1,1.5-14.3,3.9Zm52.3,74.6c7.8,.6,16.5,1.5,19.2,2.1,10.1,2.2,23.3,13.5,29.7,25.6,5.1,9.5,6.3,15.7,6.3,33.3,0,25.9-2.1,32.2-14.5,43.8-18.9,17.7-38.5,26.3-63.4,27.9l-10.4,.6,.7-4.9c.4-2.7,1.2-7.8,1.7-11.4s1.2-30.8,1.5-60.5c.4-29.7,1-54.8,1.5-55.7,1-1.9,3.7-2.5,9.4-2.1,2.2,.2,10.4,.8,18.3,1.3Z"
      fill={`url(#detail-3-${index})`}
    />
  </svg>
</div>

<div class="legend">
  {#each itemsWithHeight as item}
    <div class="legend-item">
      <span class="name">{item.text}</span>
      <span class="icon" style={`color: ${item.color};`} />
    </div>
  {/each}
</div>

<div class="description">
  {description}
</div>

<style>
  .wrapper {
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .legend-item {
    margin-bottom: 20px;
    margin-left: 30px;
  }

  .description {
    white-space: pre-wrap;
    text-align: center;
  }

  .icon {
    display: inline-block;
    width: 0.8em;
    margin-left: 0.4em;
    height: 0.8em;
    border-radius: 0.2em;
    background: currentColor;
  }

  .hideHelper {
    display: none;
  }

  svg {
    width: 400px;
  }
</style>
