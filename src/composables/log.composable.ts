import type { GraphInterface } from '@/interfaces'
import type { LogInterface } from '@/interfaces/log.interface'
import { api_client } from '@/utils/axios'
import { ref } from 'vue'

export const useLogComposable = () => {
  const logs = ref<LogInterface[]>([])
  const graph_data = ref<GraphInterface>({} as GraphInterface)
  const loading = ref(false)

  const limit = ref(10)
  const offset = ref(0)

  const get_content = async () => {
    await api_client
      .get<LogInterface[]>('/service/logs', {
        params: {
          limit: limit.value,
          offset: offset.value,
        },
      })
      .then((response) => {
        console.log(response.data)
        logs.value = response.data
      })
      .catch((error) => {
        console.error('Error fetching logs:', error)
      })
  }

  const set_limit = (new_limit: number) => {
    limit.value = new_limit
  }

  const set_offset = (new_offset: number, rest: boolean = false) => {
    offset.value = rest ? offset.value - new_offset : offset.value + new_offset
  }

  const get_graph_data = async () => {
    const response = await api_client.get<GraphInterface>('/service/logs/graph_data');
    graph_data.value = response.data;
  }

  return {
    logs,
    loading,
    get_content,
    set_limit,
    set_offset,
    offset,
    limit,
    get_graph_data,
    graph_data
  }
}
