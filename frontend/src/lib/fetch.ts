export const fetchCollection = async (name: string) => {
  return fetch(window.location.href + "/api/" + name)
    .then((res) => res.json())
    .then(({ data }) => data);
};
