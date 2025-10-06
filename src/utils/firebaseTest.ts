import { db } from '../firebase/config';
import { doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  console.log('🧪 Testing Firebase connection...');
  
  try {
    // Test 1: Simple write to test collection
    const testData = {
      message: 'Hello Firebase!',
      timestamp: new Date(),
      test: true
    };
    
    console.log('📝 Writing test document...');
    const testDocRef = doc(db, 'test', 'connection-test');
    await setDoc(testDocRef, testData);
    console.log('✅ Test document written successfully');
    
    // Test 2: Read back the document
    console.log('📖 Reading test document...');
    const testDoc = await getDoc(testDocRef);
    if (testDoc.exists()) {
      console.log('✅ Test document read successfully:', testDoc.data());
    } else {
      console.log('❌ Test document not found');
    }
    
    // Test 3: Add document to collection
    console.log('📄 Adding document to collection...');
    const collectionRef = collection(db, 'test');
    const docRef = await addDoc(collectionRef, {
      message: 'Collection test',
      timestamp: new Date()
    });
    console.log('✅ Document added to collection with ID:', docRef.id);
    
    return true;
  } catch (error: any) {
    console.error('❌ Firebase connection test failed:', error);
    console.error('Error details:', {
      code: error?.code,
      message: error?.message,
      stack: error?.stack
    });
    return false;
  }
};

export const testUserCreation = async (userData: any) => {
  console.log('👤 Testing user creation...');
  
  try {
    const userDocRef = doc(db, 'users', userData.uid);
    await setDoc(userDocRef, userData);
    console.log('✅ User document created successfully');
    
    // Verify the document was created
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      console.log('✅ User document verified:', userDoc.data());
      return true;
    } else {
      console.log('❌ User document not found after creation');
      return false;
    }
  } catch (error: any) {
    console.error('❌ User creation test failed:', error);
    console.error('Error details:', {
      code: error?.code,
      message: error?.message,
      stack: error?.stack
    });
    return false;
  }
};
