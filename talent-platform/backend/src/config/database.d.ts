declare module 'database' {
  const connectDB: () => Promise<void>;
  export default connectDB;
} 