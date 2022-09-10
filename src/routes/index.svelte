<script lang="ts">
  import Socials from "../components/socials.svelte";
</script>

<!-- new part -->
<div class="about_me">


  <div class="me">
    <div class="header_me">
      <h1 class="about-me_name_1">Bulat Kutlugallyamov.</h1>
    </div>
  
    <div class="about-me_profession_1">
      <h2>Backend golang</h2>
    </div>
  </div>
  

	
	<!-- new part -->
	<div class="my_list">
		<ul class="socials_list">
			<Socials nameStart="Linked" nameEnd="in" link="https://www.linkedin.com/in/bulat-kutlugallyamov-86506921b/"/>
			<Socials nameStart="Git" nameEnd="Hub" link="https://github.com/bulatok"/>
			<Socials nameStart="Habr" nameEnd="Career" link="https://career.habr.com/bulatok"/>
			<Socials nameStart="bulat2020205" nameEnd="@gmail.com" link="mailto:bulat2020205@gmail.com"/>
			<Socials nameStart="Tele" nameEnd="gram" link="https://t.me/bulatok4"/>
		</ul>
	</div>

</div>

<style>
  .my_navbar{
    padding: 0;
    margin: 0;
  }
  .my_list{
    text-align: center;
  }
  .navbar_layout{
    position: absolute;
    left: 0;
    bottom: 0;
		min-width: 100%;
		min-height: 100%;
		position: relative;
		overflow: hidden;
    padding: 0;
    margin: 0;
		background-color: #333;
	}
	.navbar_layout a{
		float: left;
		display: block;
		color: #f2f2f2;
		text-align: center;
		padding: 14px;
		text-decoration: none;
	}

  .header_me{
    padding-top: 70px;
    text-align: center;
  }

  .about-me_profession_1{
    text-align: center;
  }
  
  

  :global(body) {
    margin: 0;
    color: #fff;
    font-family: Ubuntu Mono, monospace;
  }
  
  .about-me_profession_1{
    	margin-top: 15px;
  }

  .about-me_profession_1 h2 {
    line-height: 0;
    margin-top: 6px;
    margin-bottom: 3rem;
  }

  .header_me h1 {
    margin-top: 60px;
    font-size: 2.5rem;
    margin-bottom: 0;
  }

  @media (max-width: 370px){
		h1{
			font-size: 2.20rem !important;
		}
	}

  @media (max-width: 370px){
		h2{
			font-size: 1.5rem !important;
		}
	}
  

  @media screen and (max-width: 900px){
      .header_me h1 {
      margin-top: 40px;
      font-size: 2.5rem;
      margin-bottom: 0;
    }
	}
</style>
