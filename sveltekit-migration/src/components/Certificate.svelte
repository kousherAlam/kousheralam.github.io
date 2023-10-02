<script>
	export let data = {
		badge: '',
		title: '',
		issue: {
			by: '',
			date: '',
			website: ''
		},
		verify: ''
	};
</script>

<div class="shadow bg-slate-50 w-full">
	<div class="grid grid-cols-12">
		<div class="flex justify-center items-center col-span-3 bg-slate-100 py-2 px-1">
			<img src={data.badge} alt="Google Verification badge" />
		</div>
		<div class="col-span-9 pl-3 pr-3 flex flex-col justify-between">
			<div>
				<h4 class="text-lg">{data.title}</h4>
				<ul class="list-none">
					<li>
						<p class="mb-0 mt-1 text-xs text-gray-500">
							<span>
								<a href={data.issue.website} target="_blank"> {data.issue.by} </a>
							</span>
						</p>
					</li>
					<li>
						<p class="mb-0 mt-1 text-xs text-gray-500">
							<span>Issued On</span>
							<span>{data.issue.date}</span>
						</p>
					</li>
				</ul>
			</div>
			<div>
				<a
					class="text-sm text-orange-600 hover:text-orange-500 visited:text-orange-800"
					href={data.verify}
					target="_blank"
				>
					Verify Certificate
				</a>
			</div>
		</div>
	</div>
</div>
