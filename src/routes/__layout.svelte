<script lang="ts">
	import Onreload from "../components/onreload.svelte";
</script>

<style>
	:global(body){
		margin: 0;
		color: #fff;
		font-family:Ubuntu Mono,monospace;
		background-repeat: no-repeat;
		background-size: 100%;
	}

	.header_header{
    	position: relative;
    	float: right;
		width: 303px;
		height: auto;
		margin: 0 auto;
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
	.header_header .header_list a{
		font-size: small;
		box-sizing: border-box;
		text-decoration: none;
		color: #fff;
		transition: all .3s;
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
	/* .my_list ul{
        bottom: 0;
        position: absolute;
    	padding-left: 0;
		left: auto;
	} */
	/* .my_list{
		margin-bottom: 100px;
	} */
	.header_header .header_list a:hover{
		display: inline-block;
		transform: scale(1.2);
	}
	@media screen and (max-width: 900px){
		.first{
			font-size: 100px;
		}
		.header_header{
			position: absolute;
			left: 10%;
			/* margin-bottom: 100%; */
		}
	}
	@media (max-width: 370px){
		a{
			font-size: 0.72rem !important;
		}
	}
	.header_item_1{
		text-align: center;
	}
	.my_navbar{
    padding: 0;
    margin: 0;
  }
  .my_list{
    text-align: center;
  }
  .navbar_layout{
	background-color: rgba(0, 0, 0, 0.498);
	/* background: transparent; */
    position: absolute;
    left: 0;
    bottom: 0;
	min-width: 100%;
	min-height: 100%;
	position: relative;
	overflow: hidden;
    padding: 0;
    margin: 0;
	}
	.navbar_layout a{
		float: left;
		display: block;
		color: #f2f2f2;
		text-align: center;
		padding: 14px;
		text-decoration: none;
	}
</style>

<nav>
	<Onreload/>
	<!-- <Currency/> -->

	<!-- new part -->
	<nav class="navbar_layout">
		<ul class="my_navbar">
        <a href="/">home</a>
        <a href="/projects">projects</a>
			  <a href="/homies">articles</a>    
		</ul>
	</nav>
</nav>

<div class = "conatainer">
    <slot></slot>
</div>



