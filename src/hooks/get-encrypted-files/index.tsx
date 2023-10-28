import React from 'react';
import { useAccount } from 'wagmi';
export interface TransactionNode {
	node: {
		id: string;
		size: string;
		tags: { name: string; value: string }[];
		timestamp: number;
		address: string;
	};
}

const useGetEncryptedFiles = () => {
	const { address } = useAccount();
	const [data, setData] = React.useState<TransactionNode[]>([]);
	const [error, setError] = React.useState<Error | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [endCursor, setEndCursor] = React.useState<string | null>(null);

	const refetch = async () => {
		try {
			setData([]);
			setError(null);
			setIsLoading(true);
			const res = await fetch('https://devnet.irys.xyz/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					query: `
						query getEncryptedTransactions($tags: [TagFilter!], $owners: [String!]) {
							transactions(tags: $tags, owners: $owners) {
								edges {
									node {
										id
										size
										tags {
											name
											value
										}
										timestamp
										address
									}
								}
								pageInfo {
									hasNextPage
									endCursor
								}
							}
						}
					`,
					variables: {
						tags: [
							{
								name: 'App-Name',
								values: ['Encrypted Uploader'],
							},
							{
								name: 'Type',
								values: ['encrypted-image'],
							},
						],
						owners: [address],
					},
				}),
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const json = await res.json();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			setEndCursor(json?.data?.transactions?.pageInfo?.endCursor);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			setData(json?.data?.transactions?.edges as TransactionNode[]);
		} catch (error) {
			setError(new Error(String(error)));
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (address) {
			void refetch();
		}
	}, [address]);

	const next = async () => {
		try {
			setIsLoading(true);
			if (data.length === 0) return;
			if (!endCursor) {
				throw new Error('No Next Page data found');
			}
			const res = await fetch('https://devnet.irys.xyz/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					query: `
						query getEncryptedTransactions(
							$tags: [TagFilter!]
							$owners: [String!]
							$after: String
						) {
							transactions(tags: $tags, owners: $owners, after: $after) {
								edges {
									node {
										id
										size
										tags {
											name
											value
										}
										timestamp
										address
									}
								}
								pageInfo {
									hasNextPage
									endCursor
								}
							}
						}
					`,
					variables: {
						after: endCursor,
						tags: [
							{
								name: 'App-Name',
								values: ['Encrypted Uploader'],
							},
							{
								name: 'Type',
								values: ['encrypted-image'],
							},
						],
						owners: [address],
					},
				}),
			});
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const json = await res.json();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			setEndCursor(json?.data?.transactions?.pageInfo?.endCursor);
			setData((prev) => [
				...prev,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				...(json?.data?.transactions?.edges as TransactionNode[]),
			]);
		} catch (error) {
			setError(new Error(String(error)));
			console.log(error);
		}
	};
	return { refetch, next, data, isLoading, error };
};

export default useGetEncryptedFiles;
