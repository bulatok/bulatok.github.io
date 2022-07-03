<script lang="ts">
    export let Name;
    export let Link;
    export let Info;
</script>

<style>
    .glop{
        margin-top: 5%;
		
    }
    .glop a{
        color: #64ffda;;
		box-sizing: border-box;
        text-decoration: none;
    }
</style>

<div class="glop">
    <h1>
        <a href={Link}>{Name}</a>
    </h1>
    <p>{Info}</p>
</div>