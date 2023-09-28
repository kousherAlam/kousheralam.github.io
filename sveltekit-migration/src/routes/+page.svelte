<script>
	import Articlecard from '../components/Articlecard.svelte';
	import Intro from '../components/Intro.svelte';
	import Certificate from '../components/Certificate.svelte';

	const blogPosts = [
		{
			title:
				'Complete developer guide of OAuth and AzureAD - How you should secure your API from day 1',
			link: '/link',
			published: '12 Oct 2023',
			lastUpdate: '12 Oct 2023',
			type: 'Blog Post'
		},
		{
			title: 'Redux disect',
			link: '/link',
			published: '15 Oct 2023',
			lastUpdate: '15 Oct 2023',
			type: 'Blog Post'
		},
		{
			title: 'Dinkwell Mobile Apps',
			link: '/link',
			published: '15 Oct 2023',
			lastUpdate: '15 Oct 2023',
			type: 'Project'
		}
	];
</script>

<svelte:head>
	<title>Kousher's Webstie</title>
</svelte:head>

<Intro />

<div class="pt-4 pb-4 mt-10">
	<div class="grid grid-cols-3 gap-3">
		<Certificate />
		<Certificate />
		<Certificate />
	</div>
</div>

<div class="mt-8 pt-4">
	{#each blogPosts as post}
		<div class="mt-3">
			<Articlecard {...post} />
		</div>
	{/each}
</div>
