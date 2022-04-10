def count_func(target, arr):
    score = 0

    for i in arr:
        if i == target:
            score += target

    return score


def four_of_a_kind(arr):
    kind = set(arr)
    for i in kind:
        count = 0
        for j in arr:
            if i == j:
                count += 1

        if count >= 4:
            return sum(arr)

    return 0

def small_straight(arr):
    arr.sort()
    count = 1
    for i in range(4):
        if arr[i + 1] - arr[i] == 1:
            count += 1

    if count >= 4:
        return 15
    else:
        return 0


def large_straight(arr):
    arr.sort()
    count = 1
    for i in range(4):
        if arr[i + 1] - arr[i] == 1:
            count += 1

    if count >= 5:
        return 30
    else:
        return 0

def yatch(arr):
    if len(set(arr)) == 1:
        return 50
    else:
        return 0

def full_house(arr):
    kind = set(arr)
    count = [0 for _ in range(6)]

    for i in kind:
        for j in arr:
            if i == j:
                count[i-1] += 1

    if 3 in count and 2 in count:
        return sum(arr)
    else:
        return 0
