import { api } from '@repo/backend/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Text, View } from 'react-native';

export default function Index() {
  const tasks = useQuery(api.tasks.get);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-4 text-4xl font-bold text-blue-500">Welcome!</Text>
      <View className="gap-4">
        {tasks?.map(({ _id, text }) => (
          <Text key={_id} className="rounded-lg bg-gray-100 p-2 text-lg text-gray-700">
            {text}
          </Text>
        ))}
      </View>
    </View>
  );
}
