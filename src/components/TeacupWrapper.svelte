<script lang="ts">
  import TeaCup from "./TeaCup.svelte";
  import { Content } from "../utils/api";
  export let content: Content;

  const teacups = content.data.attributes.teacup_graph;
</script>

{#each teacups as teacup, i}
  <TeaCup content={teacup} index={i} />
{/each}
