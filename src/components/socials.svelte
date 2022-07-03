<script lang="ts">
    export let nameStart;
    export let nameEnd;
    export let link;
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