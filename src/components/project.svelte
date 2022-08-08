<script lang="ts">
    export let Name: string;
    export let Link: string;
    export let Info: string;
</script>

<style>
    .glop{
        margin-top: 54px;
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