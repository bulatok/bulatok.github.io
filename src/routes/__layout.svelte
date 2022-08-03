<script lang="ts">
	import Socials from "../components/socials.svelte";
	import Currency from "../components/currency.svelte";	
	import Onreload from "../components/onreload.svelte";
</script>

<style>
	:global(body){
		/* background: #0a192f url("/public/images/background/2.png"); */
		color: #fff;
		font-family:Ubuntu Mono,monospace;
		line-height: 1.1;
		padding-left: 15px;
		padding-top: 30px;
		/* background: linear-gradient(#e66465, #9198e5); */
		background-repeat: no-repeat;
		background-size: 100%;
	}
	.header_header{
    	position: relative;
    	float: right;
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
        bottom: 0;
        position: fixed;
    	padding-left: 0
	}

</style>

<nav>
	<Onreload/>
	<Currency/>
	<!-- new part -->
	<div class="container_inner">
        
		<div class="header_header">
			<ul class="header_list">
                <li class="header_item_0">
                    <a href="/" class="first">
                        <span class="header_counter_1">01. </span>Home
                    </a>
                </li>

				 <li class="header_item_1">
					 <a href="/projects" class="first">
						 <span class="header_counter_1">02. </span>Projects
					 </a>
				 </li>
				 <li class="header_item_2">
					 <a href="/homies" class="second">
					   <span class="header_counter_2">03. </span>
					   Articles
					 </a>
				 </li>
			</ul>
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
</nav>

<div class = "conatainer">
    <slot></slot>
</div>



