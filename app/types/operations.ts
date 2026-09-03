export interface Operation
{
	[key: string]:
	{
		frontend : { label: string },
		python   :
		{
			function : string,
			module   : string
		}
	}
};

export interface SerializedOperation
{
	code  : string,
	label : string,
}