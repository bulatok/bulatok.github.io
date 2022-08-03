<script lang="ts">
    import { onMount } from 'svelte';
    onMount(() =>{
    	let getRandom = function (n: number): number{
    	    return Math.round(Math.random() * n + 1);
    	}
	
    	const numberImages: number = 35;
    	let images: Array<string> = []
    	for (let i = 0; i < numberImages; i++){
    	    images.push(`${i+1}.png`)
    	}
    	const id: number = getRandom(numberImages);
    	const image: string = images[id];
    	const path: string = `url('./images/background/${image}')`;
    	console.log(path);
		document.body.style.backgroundImage = path;
		document.body.style.backgroundRepeat = "no-repeat";
		document.body.style.backgroundSize = "100% 600%";
    });
</script>