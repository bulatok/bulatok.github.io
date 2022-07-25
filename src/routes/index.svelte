<script lang="ts">
  import Button from "../components/button.svelte";
  import MeInfo from "../components/meInfo.svelte";
</script>

<!-- new part -->
<div class="about_me">
  <div class="header_me">
    <h1 class="about-me_name_1">Bulat Kutlugallyamov.</h1>
  </div>

  <div class="about-me_profession_1">
    <h2>Senior HTML/CSS</h2>
  </div>

  <!-- !button! -->
  <Button>change background</Button>
  <MeInfo
    descip="19 years old student from Innopolis university."
  />

  <MeInfo
    descip="Have experience in writing several chat bots for telegram and VK on Golang and python.
		I used docker and docker-compose tools for deploying and managing them. 
		Postgresql was choosen as a database storage.
		"
  />

  <MeInfo
    descip="Wrote api-wrapper that finds the best cryptocurrency exchange rates. 
			The whole module was written on golang."
  />
</div>

<style>
  :global(body) {
    /* background: #0a192f url("/public/images/background/2.png"); */
    color: #fff;
    font-family: Ubuntu Mono, monospace;
    line-height: 1.1;
    padding-left: 15px;
    padding-top: 30px;
  }
  .about-me_profession_1 h2 {
    line-height: 0;
    margin-top: 6px;
    margin-bottom: 3rem;
  }
  .header_me h1 {
    font-size: 2.5rem;
    margin-bottom: 0;
  }
</style>
