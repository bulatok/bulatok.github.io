<script lang="ts">
    export let nameStart: string;
    export let nameEnd: string;
    export let link: string;
</script>

<style>
    .endSocialItemSpan{
        color: #64ffda;
    }
    div{
    	display:inline-block;
		margin-right: 10px;
		margin-left: 0;
		padding-left: 0;
		list-style-type: none;
	}
    a{
		color: #fff;
		text-decoration: none;
        transition: all .3s;
	}
    a:hover{
        display: inline-block;
		transform: scale(1.05);
    }
</style>

<div>
    <div>
        <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a href={link}>{nameStart}<span class="endSocialItemSpan">{nameEnd}</span><a>
        </li>
    </div>
</div>