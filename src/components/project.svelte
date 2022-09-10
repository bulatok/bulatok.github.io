<script lang="ts">
    export let Name: String;
    export let Link: String;
    export let Info: String;
</script>

<style>
    .glop{
        margin-top: 54px;
        text-align: center;
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