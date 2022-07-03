<script lang="ts">
    export function changeBackground(): void{
    	let getRandom = function (n: number): number{
    	    return Math.round(Math.random() * n + 1);
    	}

    	const numberImages: number = 23;
		
    	let images: Array<string> = []
    	for (let i = 0; i < numberImages; i++){
    	    images.push(`${i+1}.png`)
    	}
    	const id: number = getRandom(numberImages);
    	const image: string = images[id];
		
    	const path: string = `url('./images/background/${image}')`;
    	console.log(path);
		document.body.style.backgroundImage = path;
	}
</script>
<style>
    button {
        color: #fff;
        background-color: #0a192f;
        padding: 1rem 1.5rem;
        border-width: 2px;
        box-sizing: inherit;
        line-height: 1.1;
    }
</style>

<button on:click={changeBackground} >
    <slot/>
</button>