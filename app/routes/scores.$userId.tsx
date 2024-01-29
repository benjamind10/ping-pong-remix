import { LoaderFunction, useLoaderData } from '@remix-run/react';

// Define your loader function here
export const loader: LoaderFunction = async () => {
    // Fetch data based on params.gameID
    return null

};

// The component that will be rendered for the route
export default function UserDetails() {
    // const data = useLoaderData();
    // Render your component using the loaded data
    return (
        <div>
            {/* Your component logic here */}
            <h1>UserDetails</h1>
        </div>
    );
}
