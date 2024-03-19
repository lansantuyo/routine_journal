import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-2">
            404 Not Found
            {/* If you want to go back to link but NOT refresh the page */}
            <Link to ="/"> Back to Home</Link>

            {/* If you want to go back to link and refresh the page */}
            {/* <a href="/">Home from A</a> */}
        </div>
    );
}

// import { Title, Text, Button, Container, Group } from '@mantine/core';
// import classes from './NotFoundTitle.module.css';

// export default function NotFoundPage() {
//   return (
//     <Container className={classes.root}>
//       <div className={classes.label}>404</div>
//       <Title className={classes.title}>You have found a secret place.</Title>
//       <Text c="dimmed" size="lg" ta="center" className={classes.description}>
//         Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
//         been moved to another URL.
//       </Text>
//       <Group justify="center">
//         <Button variant="subtle" size="md">
//           Take me back to home page
//         </Button>
//       </Group>
//     </Container>
//   );
// }