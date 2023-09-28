<script>
	export let title = `Complete developer guide of OAuth and AzureAD - How you should secure your API from day 1`;
	export let link = `/link-to-here`;
	export let published = '12 Oct 2023';
	export let lastUpdate = '12 Oct 2023';
	export let type = `Blog Post`;
</script>

<div class="py-4 px-6 bg-slate-100 shadow-sm border border-gray-200">
	<h4 class="text-xl mb-2">
		<a class="text-orange-600 visited:text-orange-700 hover:text-orange-400" href={link}>{title}</a>
	</h4>
	<div>
		<ul class="list-none flex justify-start text-sm text-slate-500">
			<li><span class="font-bold">{type}</span></li>
			<li class="pl-3"><span>Published on: </span> <span>{published}</span></li>
			<li class="pl-3"><span>Last Update:</span><span>{lastUpdate}</span></li>
		</ul>
	</div>
</div>
