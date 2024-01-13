import { auth, db, provider } from '../firebase'
import { logIn, setError, setLoading, logOut, changePassword } from '../store'
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { doc, setDoc, getDoc } from 'firebase/firestore'

function useAuth() {
    const dispatch = useDispatch();
    const signInWithGoogle = async () => {
        dispatch(setLoading(true));
        try {
            const result = (await signInWithPopup(auth, provider)).user;
            const user = {
                displayName: result.displayName,
                email: result.email,
                uid: result.uid,
                photoURL: result.photoURL,
                phoneNumber: result.phoneNumber,
                providerId: result.providerId,
                isAnonymous: result.isAnonymous,
                lastLoggedInAt: result.metadata.lastLoggedInAt,
                createdAt: result.metadata.createdAt,
                lastRefreshAt: result.metadata.lastRefreshAt,
                emailVerified: result.emailVerified,
            }
            const existingUserDoc = await getDoc(doc(db, 'users', user.uid));

            if (existingUserDoc.exists()) {
                // User exists, fetch the user data
                const existingUserData = existingUserDoc.data();
                dispatch(logIn(existingUserData));
            } else {
                // User doesn't exist, create the user in the database
                await createUser(user);
                dispatch(logIn(user));
            }
            dispatch(setError(null));
        }
        catch (error) {
            dispatch(setError(error.message));
            console.log("google sign in ", error.message);
        }
        finally {
            dispatch(setLoading(false));
        }

    }


    const createUser = async (user) => {
        console.log(user)
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
        });
        await setDoc(doc(db, "usersChat", user.uid), {});
    }

    const createAccountWithEmail = async (username, email, password) => {
        dispatch(setLoading(true));
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Update user profile with display name
            await updateProfile(user, { displayName: username });
            // Log in the user after creating the account
            loginWithEmail(email, password);
            await createUser(user);

        } catch (error) {
            dispatch(setError(error.message));
            console.log("create account ", error.message);
        } finally {
            dispatch(changePassword(""));
            dispatch(setLoading(false));
        }
    };

    const loginWithEmail = async (email, password) => {
        dispatch(setLoading(true));
        try {
            const result = (await signInWithEmailAndPassword(auth, email, password)).user;
            const user = {
                displayName: result.displayName,
                email: result.email,
                uid: result.uid,
                photoURL: result.photoURL,
                phoneNumber: result.phoneNumber,
                providerId: result.providerId,
                isAnonymous: result.isAnonymous,
                lastLoggedInAt: result.metadata.lastLoggedInAt,
                createdAt: result.metadata.createdAt,
                lastRefreshAt: result.metadata.lastRefreshAt,
                emailVerified: result.emailVerified,
            }
            dispatch(logIn(user));
            dispatch(setError(null));
        }
        catch (error) {
            dispatch(setError(error.message));
            console.log("login user ", error.message);
        }
        finally {
            dispatch(changePassword(""));
            dispatch(setLoading(false));

        }


    };

    const logOutFromApp = async () => {
        try {
            await auth.signOut();
            dispatch(logOut());
        }
        catch (error) {
            dispatch(setError(error.message));
            console.log("logout ", error.message);
        }
    }

    return {
        signInWithGoogle,
        createAccountWithEmail,
        logOutFromApp,
        loginWithEmail
    }
}
export default useAuth;