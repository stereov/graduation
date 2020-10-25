import { Effect, Reducer } from 'umi';
import { addTopic } from '@/services/topic';
import { message } from 'antd'

export interface TopicActionStateType {
    result: boolean;
    msg: string;
}

export interface ModelType {
    namespace: string;
    state: TopicActionStateType;
    effects: {
        addTopic: Effect;
    };
    reducers: {
        getOperationStatus: Reducer<TopicActionStateType>;
    };
}

const Model: ModelType = {
    namespace: 'topicAction',
    state: {
        result: false,
        msg: '',
    },

    effects: {
        *addTopic({ payload }, { call, put }) {
            const response = yield call(addTopic, payload);
            message.success(response.msg);
            yield put({
                type: 'getOperationStatus',
                payload: {
                    result: response.code === 9,
                    msg: response.msg,
                },
            });

        },
    },

    reducers: {
        getOperationStatus(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};

export default Model;