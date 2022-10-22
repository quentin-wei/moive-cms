import Mock from 'mockjs';

const getMockData = async (num) => {
  const data = Mock.mock({
    [`list|${num}`]: [
      {
        id: '@id()',
        'sex|0-1': 1,
        'age|18-35': 22,
        'password|100000-999999': 123456,
        name: '@cname()',
        color: '@color()',
        title: '@ctitle(10,20)',
        content: '@csentence()',
        show: '@boolean()',
        province: '@province()',
        postCode: '@zip()',
        email: '@email()',
        ip: '@ip()',
      },
    ],
  });

  return data;
};

export { getMockData };
