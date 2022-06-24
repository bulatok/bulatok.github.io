<script lang="ts">
	import Button from "./button.svelte";
	import Socials from "./socials.svelte";
	import MeInfo from "./meInfo.svelte";
	import Currency from "./currency.svelte";

</script>

<style>
	:global(body){
		/* background: #0a192f url("/public/images/background/2.png"); */
		color: #fff;
		font-family:Ubuntu Mono,monospace;
		line-height: 1.1;
		padding-left: 15px;
		padding-top: 30px;
	}
	.header_header{
    	position: relative;
    	float: right;
	}
	.header_me h1{
		font-size: 2.5rem;
		margin-bottom: 0;
	}
	.about-me_profession_1 h2{
		line-height: 0;
		margin-top: 6px;
		margin-bottom: 3rem;
	}

	.header_header .header_list{
		margin: 0;
		padding: 4px;
	}
	.header_header .header_list li{
		display: inline;
		margin-right: 10px;
		padding: 3px; 
	}
	.header_header .header_list .first{
		font-size: small;
		box-sizing: border-box;
		text-decoration: none;
		color: #fff
	}
	.header_header .header_list .header_counter_1{
		color: #64ffda;
	}

	.header_header .header_list .second{
		font-size: small;
		box-sizing: border-box;
		text-decoration: none;
		color: #fff;
	}
	.header_header .header_list .header_counter_2{
		color: #64ffda;
	}

	/* third part */
	.my_list ul{
    	padding-left: 0
	}

</style>

<body>
	<Currency/>
	<!-- new part -->
	<div class="container_inner">
		<div class="header_header">
			<ul class="header_list">
				 <li class="header_item_1">
					 <a href="content/projects.html" class="first">
						 <span class="header_counter_1">01. </span>Projects
					 </a>
				 </li>
				 <li class="header_item_2">
					 <a href="content/articles.html" class="second">
					   <span class="header_counter_2">02. </span>
					   Articles
					 </a>
				 </li>
			</ul>
		</div>

		<div class="header_me">
			<h1 class="about-me_name_1">
				Bulat Kutlugallyamov.
			</h1>
		</div>
	
	</div>

	<!-- new part -->
	<div class="about_me">
		<div class="about-me_profession_1">
			<h2>Backend Developer</h2>
		</div>
		
		<!-- !button! -->
		<Button> change background</Button>

		<MeInfo descip="19 years old freshman from Innopolis university. Golang enjoyer."/>
		
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
	
	<!-- new part -->
	<div class="my_list">
		<ul class="socials_list">
			<Socials nameStart="Linked" nameEnd="in" link="https://www.linkedin.com/in/bulat-kutlugallyamov-86506921b/"/>
			<Socials nameStart="Git" nameEnd="Hub" link="https://github.com/bulatok"/>
			<Socials nameStart="Habr" nameEnd="Career" link="https://career.habr.com/bulatok"/>
			<Socials nameStart="bulat2020205" nameEnd="@gmail.com" link="mailto:bulat2020205@gmail.com"/>
		</ul>
	</div>
</body>



