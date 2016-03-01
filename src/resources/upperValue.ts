export class UpperValueConverter {
    toView(value) {
        return value && value.toUpperCase();
    }

    fromView(value) {
        return value.toUpperCase();
    }
}